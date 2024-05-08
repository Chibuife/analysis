import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [coordinate, setCoordinate] = useState("");
  const [valuesDB, setValueDB] = useState<any>([])
  let splitted = coordinate.split(/[ ,]+/);
  console.log(splitted[1]);
  const xCordinate = parseFloat(splitted[0]);
  const yCordinate = parseFloat(splitted[1]);
  
  const compareDistanceInUnit = () => {
    const units: any[] = [];

    if (Number.isNaN(xCordinate) || Number.isNaN(yCordinate)) {
      alert("x/y coordinate undefined")
      return
    }
    else if (splitted.length > 2) {
      alert("x/y coordinate only")
      return
    }


    const coordinatesDB = [

      {
        xAxes: 6.454474,
        yAxes: 7.51225,
        height: 15,
        name: "Golden Royale"
      },
      {
        xAxes: 6.4428,
        yAxes: 7.4877,
        height: 45,
        name: "DreamFm"
      },
      {
        xAxes: 6.450786,
        yAxes: 7.536449,
        height: 13,
        name: "Fidelma Hotel"
      },
      {
        xAxes: 6.46675,
        yAxes: 7.530847,
        height: 13.957522,
        name: "Parish House"
      },
      {
        xAxes: 6.46631,
        yAxes: 7.535658,
        height: 14,
        name: "WaterTank"
      },
      {
        xAxes: 6.436467,
        yAxes: 7.514567,
        height: 30,
        name: "SPA"
      },
      {
        xAxes: 6.479345,
        yAxes: 7.497225,
        height: 20,
        name: "Ivory Estate"
      },
      {
        xAxes: 6.462388,
        yAxes: 7.520969,
        height: 40,
        name: "82 divison"
      },
    ]



    coordinatesDB.map((item, i) => {
      const deg2rad = (deg: number) => deg * (Math.PI / 180);
      const radLat1 = deg2rad(item.xAxes);
      const radLon1 = deg2rad(item.yAxes);
      const radLat2 = deg2rad(xCordinate);
      const radLon2 = deg2rad(yCordinate);

      // Haversine formula
      const dLat = radLat2 - radLat1;
      const dLon = radLon2 - radLon1;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c;
      console.log(distance)
      units.push({ distance, dbData: item })
    })
    setValueDB(units)
    console.log(units)
  }

  const ascending = valuesDB.sort((a:any, b:any) => parseFloat(a.distance) - parseFloat(b.distance));
  return (
    <div>
      <div>
        <h2>Enter coordinate</h2>
        <input type="text" className="b-2 border-2" onChange={(e) => setCoordinate(e.target.value)} />
        <button onClick={() => compareDistanceInUnit()}>Show units</button>
        <ul>
          {
            ascending.length > 0 ?
              ascending.map((item: any, i:number) => {
                return (
                  <div>
                    <li>{item.distance.toFixed(2)}</li>
                    <li>{item.dbData.name}</li>
                  </div>
                )
              })
              : null
          }
        </ul>
      </div>
    </div>
  );
}
