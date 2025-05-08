
'use client'
import '../hero.scss'
import React, { useEffect, useRef,useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup,TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import CardDemo from '@/components/HouseCard/HouseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

let DefaultIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});
L.Marker.prototype.options.icon = DefaultIcon;

const positions = [,
    {id: 1, lat: 44.408022222452196, lng: -79.6579432075455, addr: "xx Corbett Dr, Barrie, ON L4M 5V3"},
    {id: 2, lat: 43.927568830751916, lng: -78.84555030474665, addr: "xx Bennett Crescent, Oshawa, ON L1K 1T5"},
    {id: 3, lat: 43.901028488685085, lng: -78.88223774817386, addr: "xx Madison Ave, Oshawa, ON L1J 2P6"},
    {id: 4, lat: 43.920973854812026, lng: -78.96547362592808, addr: "xx Medland Ave, Whitby, ON L1P 1S1"},
    {id: 5, lat: 43.9058202177951,lng:  -78.9759913032113, addr: "xx Ogston Cres, Whitby, ON L1P 0H3"},
    {id: 6, lat: 43.88599810109301,lng:  -78.9670917301255, addr: "xx Kingfisher Way, Whitby, ON L1P 0K3"},
    {id: 7, lat: 44.34229402387427, lng: -79.73031111178403, addr: "xx Logan Ct, Barrie, ON L4N 8G6"},
    {id: 8, lat: 44.208736516164755, lng: -79.46624271039914, addr: "xx Bill Guy Dr, Georgina, ON L4P 2G3"},
    {id: 9, lat: 44.206822367023186,lng:  -79.4626822443201, addr: "xx Faimira Ave, Georgina, ON L4P 0C9"},
    {id: 10, lat: 44.098061151604725, lng: -79.44363262613304, addr: "xx Falconridge Ter, East Gwillimbury, ON L9N 0M6"},
    {id: 11, lat: 44.03371721307411, lng: -79.44726295526284, addr: "xx Winn Pl, Aurora, ON L4G 0H1"},
    {id: 12, lat: 43.94669455567249, lng: -79.43096225082786, addr: "xx Sandbanks Dr, Richmond Hill, ON L4E 4K7"},
    {id: 13, lat: 43.94379035390629, lng: -79.47896202833395, addr: "xx Heron Hollow Ave, Richmond Hill, ON L4E 3N2"},
    {id: 14, lat: 43.91561223372934, lng: -79.45355038141896, addr: "xx Greenbank Dr, Richmond Hill, ON L4E 4C7"},
    {id: 15, lat: 43.90486036138218, lng: -79.45556717879317, addr: "xx Aztec Ct, Richmond Hill, ON L4S 2W6"},
    {id: 16, lat: 43.89875708330963, lng: -79.41200435551033, addr: "xx Shirley Dr, Richmond Hill, ON L4S 2N6"},
    {id: 17, lat: 43.88306006670459, lng: -79.42370178028072, addr: "xx Rockport Crescent, Richmond Hill, ON L4C 2L7"},
    {id: 18, lat: 43.8714299797677,lng:  -79.4313656103027, addr: "xx Canterbury Ct, Richmond Hill, ON L4C 9N3"},
    {id: 19, lat: 43.864160022724846, lng: -79.43701264295048, addr: "xx Baif Blvd, Richmond Hill, ON L4C 5L2"},
    {id: 21, lat: 43.85630747319168,lng:  -79.4293488129285, addr: "xx Northern Heights Dr, Richmond Hill, ON L4B 4C9"},
    {id: 22, lat: 43.86212427585811, lng: -79.54390290378338, addr: "xx Treasure Rd, Maple, ON L6A 2Z5"},
    {id: 23, lat: 43.91619336068546, lng: -79.36884489170234, addr: "xx Isabella Peach Dr, Markham, ON L6C 0Y9"},
    {id: 24, lat: 43.906022819600096, lng: -79.26961846089142, addr: "xx Beer Ln, Markham, ON L6E 0L1"},
    {id: 25, lat: 43.888327314588786, lng: -79.31358183186525, addr: "xx Henry Bauer Ave, Markham, ON L6C 0W8"},
    {id: 26, lat: 43.891224092922705, lng: -79.25677239215076, addr: "xx Bishop Crescent, Markham, ON L3P 4N5"},
    {id: 27, lat: 43.883692176209, lng: -79.29348415272098, addr: "xx Delancey Crescent, Unionville, ON L3P 7E2"},
    {id: 28, lat: 43.88040873497232, lng: -79.31170604847846, addr: "xx Redwood Ln, Unionville, ON L3R 3Z1"},
    {id: 29, lat: 43.871523221970335, lng: -79.33850295400416, addr: "xx Baycliffe Rd, Markham, ON L3R 7T9"},
    {id: 30, lat: 43.84677447264089, lng: -79.28261938291588, addr: "xx Kyla Crescent, Markham, ON L3S 3L3"},
    {id: 31, lat: 43.82555029320998,lng:  -79.2695834551715, addr: "xx Major Oak Terrace, Scarborough, ON M1V 3E5"},
    {id: 32, lat: 43.81533850536056, lng: -79.31167087903192, addr: "xx Lapworth Crescent, Scarborough, ON M1V 2M6"},
    {id: 33, lat: 43.80270572010555, lng: -79.23680740827135, addr: "xx Malvern St, Toronto, ON M1B 2V4"},
    {id: 34, lat: 43.78442376964584, lng: -79.32545171693312, addr: "xx Pindar Crescent, North York, ON M2J 3L4"},
    {id: 35, lat: 43.78065914441371, lng: -79.30347686730688, addr: "xx Arkona Dr, Scarborough, ON M1T 1X3"},
    {id: 36, lat: 43.81157582745435,lng:  -79.3973355470664, addr: "xx Fairfield Pl, Thornhill, ON L3T 7M7"},
    {id: 37, lat: 43.7946408431481, lng: -79.43160141428021, addr: "xx Pleasant Ave, Toronto, ON M2R 2R2"},
    {id: 38, lat: 43.74165444095009, lng: -79.44091279124048, addr: "xx Cadillac Ave, North York, ON M3H 1R9"},
    {id: 39, lat: 43.71433065401443, lng: -79.41256898214223, addr: "xx Ardmore Rd, Toronto, ON M5P 1V3"},
    {id: 40, lat: 43.67914034669567, lng: -79.39904892990222, addr: "xx Bedford Rd, Toronto, ON M5R 2J7"},
    {id: 41, lat: 43.577367486854435, lng: -79.63900043483339, addr: "xx Parmeer Dr, Mississauga, ON L5C 2Y3"},
  ];

const contactPost = {
  id: 'contact',
  // image: '/images/lisa.jpg',
  highlight_image: '/pexels-earth.jpg',
  tags: ['Contact us'],
  text: "Sell faster. Stage smarter.\n Impress instantly.",
}

export default function PostMap({posts}){
  const [api, setApi] = useState();
  const mapRef = useRef(null);

  const scrollTo = (index) => {
    if (!api) return;
    const id = `house${positions[index]}`;
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex != -1){
      api.scrollTo(postIndex);
    } else {
      api.scrollTo(posts.length);
    }
  }

  const flyTo = (pos) => {
    mapRef.current.flyTo(pos,10, {
      animate:true,
      duration:0.3
    });
  }

  const center = () => {
    if (mapRef && mapRef.current && positions.length > 0){
      const map = mapRef.current;
      map.fitBounds(positions.map((pos)=>[pos.lat,pos.lng]));
      const newCenter = map.containerPointToLatLng([
          map.getSize().x /2, // X remains centered
          map.getSize().y / 2 // Move up by 20 pixels
      ]);
      map.setView(newCenter, map.getZoom() - 0.3); // Adjust the zoom and set new center
      map.options.zoomSnap = 1; // Allow fractional zoom levels
    }
  }

  useEffect(()=>{
    if (!api) return;
    center();
    api.on("select", () => {
        var index = api.selectedScrollSnap();
        if(index === posts.length) return;
        var mapIndex = positions.findIndex((pos) => `house${pos?.id}` === posts[index].id);
        if (mapIndex != -1){
          flyTo([positions[mapIndex].lat,positions[mapIndex].lng]);
        }
    })
  },[api]);
  
  return (
    <div className="container h-fit w-full max-w-sceen">
      <div className="w-full mb-10">
        <div className='max-w-vw justify-center items-center flex mb- md:mb-8 w-full'>
          <Carousel setApi={setApi} className="w-[calc(100vw-28px) lg:w-[900px] max-w-[calc(100vw-28px)] "
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className='-ml-1'>
              {posts.map((post, index) => (
                <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 lg:basis-1/3 pl-1">
                  <CardDemo post={post}/>
                </CarouselItem>
              ))}
              <CarouselItem key={-1} className="sm:basis-1/2 lg:basis-1/3 pl-1">
                <CardDemo post={contactPost}/>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='left-0' />
            <CarouselNext className='right-0'/>
          </Carousel> 
        </div>
        <MapContainer zoom={7} style={{ height: '300px', width: '100%' }} ref={mapRef} zoomSnap={0} className='rounded-xl'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={7}
            className='rounded-xl'
            style={{ borderRadius: '1rem' }}
          />
          {positions.map((position,index) => 
            <Marker key={position.id} position={[position.lat,position.lng]}
              eventHandlers={{
                click: () => {
                  scrollTo(index);
                  flyTo([position.lat,position.lng]);
                },
              }}
            >
              <Popup>{position.addr}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  )
}