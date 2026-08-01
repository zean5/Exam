import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const form = useForm({ name: "", room_id: "", start_time: "", end_time: "", status: "" });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/reservations', {
            onSuccess: () => form.reset(),
        });
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-semibold">Hotel Reservation</h1>
                    <p className="text-sm text-muted-foreground">
                        Please fill out the form below to make a reservation.
                    </p>

                <form onSubmit={submit} className="max-w-xl space-y-2 rounded-xl border p-4">
                    
                    <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <Input 
                        id="name" 
                        value={form.data.name} 
                        onChange={(event)=> form.setData('name', event.target.value)}
                        />
                        {form.errors.name && <p className="text-sm text-red-600">{form.errors.name}</p>} 
                    </div>


                    <div className="space-y-2">
                    <label htmlFor="room_id">Room ID</label>
                    <Input 
                        id="room_id" 
                        value={form.data.room_id} 
                        onChange={(event)=> form.setData('room_id', event.target.value)}
                        />
                        {form.errors.room_id && <p className="text-sm text-red-600">{form.errors.room_id}</p>} 
                        
                    </div>


                    <div className="space-y-2">
                    <label htmlFor="start_time">Start Time</label>
                    <Input 
                        id="start_time" 
                        value={form.data.start_time} 
                        onChange={(event)=> form.setData('start_time', event.target.value)}
                        />
                        {form.errors.start_time && <p className="text-sm text-red-600">{form.errors.start_time}</p>} 
                    </div>



                    <div className="space-y-2">
                    <label htmlFor="end_time">End Time</label>
                    <Input 
                        id="end_time" 
                        value={form.data.end_time} 
                        onChange={(event)=> form.setData('end_time', event.target.value)}
                        />
                        {form.errors.end_time && <p className="text-sm text-red-600">{form.errors.end_time}</p>}
                    </div>



                    <Button type="submit" disabled={form.processing}>Save Product</Button>
                </form>



                </div>






                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>*/}

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
