
import React from 'react';

export default function BookingDetail({slot,onEnd}:{slot:number,onEnd:()=>void}) {
  const data = localStorage.getItem('booking_'+slot);
  if(!data) return <p className="text-center">Tidak ada data.</p>;
  const record = JSON.parse(data);
  const passed = (Date.now() - record.start)/60000;
  const remaining = record.duration - passed;

  return (
    <div className="bg-white text-black p-3 rounded shadow w-full max-w-sm mx-auto text-center">
      <p>Nama: {record.name}</p>
      <p>Plat: {record.plate}</p>
      <p>Durasi: {record.duration} menit</p>
      { remaining > 0 ? <p>Sisa waktu: {remaining.toFixed(1)} menit</p> : <p className="text-red-600">Overtime: {-remaining.toFixed(1)} menit</p> }
      <button className="bg-red-600 text-white px-3 py-1 mt-2" onClick={onEnd}>Akhiri Parkir</button>
    </div>
  )
}
