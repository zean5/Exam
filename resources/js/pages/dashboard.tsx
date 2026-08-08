import { Head } from '@inertiajs/react';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { toast } from 'sonner';

type ScheduleFormState = {
    title: string;
    room: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    notes: string;
};

type ScheduleItem = {
    id: string;
    title: string;
    room: string;
    start_at: string;
    end_at: string;
    notes: string;
    status: 'Passed' | 'Upcoming';
    accepted?: boolean;
};

const emptyForm: ScheduleFormState = {
    title: '',
    room: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    notes: '',
};

export default function Dashboard() {
    const [form, setForm] = useState<ScheduleFormState>(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        const q = query(collection(firestore, 'reservations'), orderBy('start_at', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => {
                const data = doc.data();
                const startAt = new Date(String(data.start_at || ''));
                const endAt = new Date(String(data.end_at || ''));
                const now = new Date();
                const status: ScheduleItem['status'] = now > endAt ? 'Passed' : 'Upcoming';

                return {
                    id: doc.id,
                    title: String(data.title || 'Untitled schedule'),
                    room: String(data.room || 'N/A'),
                    start_at: startAt.toLocaleString(),
                    end_at: endAt.toLocaleString(),
                    notes: String(data.notes || ''),
                    status,
                    accepted: Boolean(data.accepted),
                };
            });

            setSchedules(items);
        });

        return () => unsubscribe();
    }, []);

    function updateField(field: keyof ScheduleFormState, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!form.title || !form.room || !form.start_date || !form.start_time || !form.end_date || !form.end_time) {
            toast.error('Please complete the required scheduling fields.');
            return;
        }

        const startAt = new Date(`${form.start_date}T${form.start_time}`);
        const endAt = new Date(`${form.end_date}T${form.end_time}`);

        if (endAt <= startAt) {
            toast.error('The end time must be later than the start time.');
            return;
        }

        setIsSaving(true);

        try {
            await addDoc(collection(firestore, 'reservations'), {
                title: form.title,
                room: form.room,
                start_date: form.start_date,
                start_time: form.start_time,
                end_date: form.end_date,
                end_time: form.end_time,
                notes: form.notes,
                start_at: startAt.toISOString(),
                end_at: endAt.toISOString(),
                created_at: serverTimestamp(),
            });

            setForm(emptyForm);
            toast.success('Scheduling request saved to Firestore.');
        } catch (error) {
            console.error('Firestore save failed', error);
            toast.error('Unable to save the scheduling request.');
        } finally {
            setIsSaving(false);
        }
    }

    async function acceptSchedule(scheduleId: string) {
        try {
            await updateDoc(doc(firestore, 'reservations', scheduleId), {
                accepted: true,
            });
            toast.success('Schedule accepted.');
        } catch (error) {
            console.error('Unable to update schedule', error);
            toast.error('Unable to accept schedule.');
        }
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">Scheduling Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new booking request and send it straight to Firestore.
                        </p>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                        <form onSubmit={submit} className="space-y-4 rounded-xl border bg-background p-6 shadow-sm">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={form.title}
                                        onChange={(event) => updateField('title', event.target.value)}
                                        placeholder="Team meeting"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="room">Room</Label>
                                    <Input
                                        id="room"
                                        value={form.room}
                                        onChange={(event) => updateField('room', event.target.value)}
                                        placeholder="Conference Room A"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={form.start_date}
                                        onChange={(event) => updateField('start_date', event.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_time">Start Time</Label>
                                    <Input
                                        id="start_time"
                                        type="time"
                                        value={form.start_time}
                                        onChange={(event) => updateField('start_time', event.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={form.end_date}
                                        onChange={(event) => updateField('end_date', event.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_time">End Time</Label>
                                    <Input
                                        id="end_time"
                                        type="time"
                                        value={form.end_time}
                                        onChange={(event) => updateField('end_time', event.target.value)}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <textarea
                                        id="notes"
                                        value={form.notes}
                                        onChange={(event) => updateField('notes', event.target.value)}
                                        placeholder="Add any extra details"
                                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Scheduling Request'}
                            </Button>
                        </form>

                        <div className="rounded-xl border bg-background p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Saved Schedules</h2>
                                    <p className="text-sm text-muted-foreground">See which bookings are already passed or still upcoming.</p>
                                </div>
                            </div>

                            {schedules.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No schedules saved yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-left text-muted-foreground">
                                                <th className="py-2 pr-3">Title</th>
                                                <th className="py-2 pr-3">Room</th>
                                                <th className="py-2 pr-3">Time</th>
                                                <th className="py-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedules.map((schedule) => {
                                                const displayStatus = schedule.accepted ? 'Accepted' : schedule.status;
                                                const badgeClass = schedule.accepted
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : schedule.status === 'Passed'
                                                      ? 'bg-muted text-muted-foreground'
                                                      : 'bg-emerald-100 text-emerald-700';

                                                return (
                                                    <tr key={schedule.id} className="border-b last:border-b-0">
                                                        <td className="py-2 pr-3 font-medium">{schedule.title}</td>
                                                        <td className="py-2 pr-3">{schedule.room}</td>
                                                        <td className="py-2 pr-3">{schedule.start_at}</td>
                                                        <td className="py-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`rounded-full px-2 py-1 text-xs ${badgeClass}`}>
                                                                    {displayStatus}
                                                                </span>
                                                                {!schedule.accepted && (
                                                                    <Button size="sm" variant="outline" onClick={() => acceptSchedule(schedule.id)}>
                                                                        Accept
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
