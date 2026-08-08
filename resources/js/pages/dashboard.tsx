import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const form = useForm({ name: "", room_id: "", start_date: "", end_date: "", date_of_arrival: "" });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/reservations' , {
            onSuccess: () => form.reset(),
    }); 
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-x1 font-semibold">Reservations</h1>
                    <p className="text-sm text-muted-foreground">
                        Please fill out the form below to create a new reservation.
                    </p>

                <form onSubmit= {submit} className="max-w-x1 space-y-2 rounded-x1 border p-4">
                    
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
                        
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="start_time">Start Date</label>
                    <Input 
                        id="start_time" 
                        value={form.data.start_date} 
                        onChange={(event)=> form.setData('start_date', event.target.value)}
                        />
                        {form.errors.start_date && <p className="text-sm text-red-600">{form.errors.start_date}</p>} 

                    </div>
                    <div className="space-y-2">
                    <label htmlFor="end_time">End Date</label>
                    <Input 
                        id="end_time" 
                        value={form.data.end_date} 
                        onChange={(event)=> form.setData('end_date', event.target.value)}
                        />
                        {form.errors.end_date && <p className="text-sm text-red-600">{form.errors.end_date}</p>} 

                    </div>
                    <div className="space-y-2">
                    <label htmlFor="date_of_arrival">Date of Arrival</label>
                    <Input 
                        id="date_of_arrival" 
                        value={form.data.date_of_arrival} 
                        onChange={(event)=> form.setData('date_of_arrival', event.target.value)}
                        />
                        {form.errors.date_of_arrival && <p className="text-sm text-red-600">{form.errors.date_of_arrival}</p>} 

                    </div>
                    
                    
                    <Button type="submit" disabled={form.processing}>Save Reservation</Button>
                    
                </form>



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



99/100
