
import React, { useState } from 'react';

export default function BookingForm({slot,onDone}:{slot:number,onDone:()=>void}) {
  const [name,setName]=useState('');
  const [plate,setPlate]=useState('');
  const [duration,setDuration]=useState(1);

  function save(){
    const record={name,plate,duration,start:Date.now()};
    localStorage.setItem('booking_'+slot, JSON.stringify(record));
    onDone();
  }

  return (
    <div className="bg-white text-black p-3 rounded shadow w-full max-w-sm mx-auto">
      <h2 className="font-bold mb-2">Pesan Slot #{slot}</h2>
      <input className="w-full border p-1 mb-2" placeholder="Nama" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full border p-1 mb-2" placeholder="Nomor Kendaraan" value={plate} onChange={e=>setPlate(e.target.value)} />
      <input type="number" className="w-full border p-1 mb-2" value={duration} onChange={e=>setDuration(Number(e.target.value))}/>
      <button className="bg-blue-600 text-white px-3 py-1" onClick={save}>Simpan</button>
    </div>
  )
}
