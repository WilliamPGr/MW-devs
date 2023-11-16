import React, { useEffect, useState } from 'react';
import './App.css'
import logo from './logo.png'; // Tell webpack this JS file uses this image
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useVisibility } from '../providers/VisibilityProvider';
import { width } from '@mui/system';

debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

type Categoryx = 'compacts' | 'coupes' | 'mc' | 'muscle' | 'offroad' | 'sedans' | 'sports' | 'sportsclassics' | 'super' | 'suvs' | 'vans';

type Brand = 'Albany' | 'Annis' | 'Benefactor' | 'BF' | 'Bollokan' | 'Bravado' | 'Brute' | 'Buckingham' | 'Canis' | 'Chariot' | 'Cheval' | 'Classique' | 'Coil' | 'Custom' | 'Declasse' | 'Dewbauchee' | 'Dinka' | 'DUDE-Logo' | 'Dundreary' | 'Emperor' | 'Enus' | 'Fathom' | 'Gallivanter' | 'Grotti' | 'Hijak' | 'HVY' | 'Imponte' | 'Invetero' | 'JackSheepe' | 'JoBuilt' | 'Karin' | 'Lampadati' | 'LCC' | 'LCS' | 'Maibatsu' | 'Mammoth' | 'Maxwell' | 'MTL' | 'Nagasaki' | 'Obey' | 'Ocelot' | 'Overflod' | 'Pegassi' | 'Pfister' | 'Principe' | 'Progen' | 'ProLaps' | 'RUNE' | 'Schyster' | 'Shitzu' | 'Speedophile' | 'Stanley' | 'SteelHorse' | 'Truffade' | 'Ubermacht' | 'Vapid' | 'Vulcar' | 'Vysser' | 'Weeny' | 'Western' | 'WesternCompany' | 'Willard' | 'WMC' | 'Zirconium';

type Color = 'white' | 'black' | 'gray' | 'red' | 'orange' | 'lime' | 'blue' | 'purple' | 'yellow';

type Vehicle = {
  name: string,
  model: string,
  price: number,
  category: Categoryx,
  imglink: string,
  acceleration: number,
  topspeed: number,
  handling: number,
  label: string,
  breaks: number,
  brand: Brand
}

const data: Vehicle[] = [
  {
    name: "Adder",
    model: "adder",
    price: 2350000,
    category: 'super',
    imglink: "https://docs.fivem.net/vehicles/adder.webp",
    acceleration: 0.90999998450279,
    topspeed: 280,
    handling: 25.17200088501,
    label: "Adder",
    breaks: 1.9301106,
    brand: "Bravado"
  },
  {
    name: "Adder2",
    model: "adder2",
    price: 2350000,
    category: "super",
    imglink: "https://docs.fivem.net/vehicles/adder.webp",
    acceleration: 0.90999998450279,
    topspeed: 280.00002670288,
    handling: 25.17200088501,
    label: "Adder2",
    breaks: 1.9301106,
    brand: "Truffade"
  },
  {
    name: "Akuma",
    model: "akuma",
    price: 60000,
    category: "mc",
    imglink: "https://docs.fivem.net/vehicles/akuma.webp",
    acceleration: 0.57199999690056,
    topspeed: 192.50001335144,
    handling: 20.3,
    label: "Akuma",
    breaks: 0.95540475620348,
    brand: "Dinka"
  }
];

interface ReturnClientDataCompProps {
  data: any
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({ data }) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>
        {JSON.stringify(data, null)}
      </code>
    </pre>
  </>
)

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '5rem',
  height: '5rem',
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type ShowSelectedVehicleProps = {
  selectedVehicle?: Vehicle,
}

const ShowSelectedVehicle: React.FC<ShowSelectedVehicleProps> = p => {

  const [primaryColor, setprimaryColor] = useState<Color>('white')

  const [secondaryColor, setsecondaryColor] = useState<Color>('white')

  const sendselectedvehicle = () => {
    fetchNui<any>('sendvehicle', [p.selectedVehicle, primaryColor, secondaryColor]).then(() =>
      fetchNui("hideFrame")
    )
  }

  return (
    <div>
      <Grid>
        <Grid>
          <div className="navlist">
            {p.selectedVehicle &&
              <div>
                <Paper className='selectedclass'>
                  <div className='selectedcarhead'>
                    <Grid container spacing={0}>
                      <Grid xs={4}>
                        <img className='brandimg' src={new URL(`./Brands/${p.selectedVehicle.brand}.png`, import.meta.url).href} />
                      </Grid>
                      <Grid xs={2} className="nameblock">
                        <a className='carname'>{p.selectedVehicle.label}</a>
                        <div className='nameborder' />
                        <a className='brandname'>{p.selectedVehicle.brand}</a>
                      </Grid>
                    </Grid>
                  </div>
                  <p className='carsubtext'>
                    <img className="selectedImg" src={p.selectedVehicle.imglink || "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-classic-stuffed-peppers-horizontal-1538065876.jpg?crop=1xw:0.7498660953401178xh"} />
                    <a className="pricetag">$: {p.selectedVehicle.price}</a>
                    <br></br>
                    Acceleration
                    <div className="bar1">
                      <div className="baramount" style={{ width: `${(p.selectedVehicle.acceleration * 100).toString()}%` }} />
                    </div>
                    Top Speed
                    <div className="bar1">
                      <div className="baramount" style={{ width: `${((p.selectedVehicle.topspeed / 300) * 100).toString()}%` }} />
                    </div>
                    Handling
                    <div className="bar1">
                      <div className="baramount" style={{ width: `${((p.selectedVehicle.handling / 30) * 100).toString()}%` }} />
                    </div>
                    Breaks
                    <div className="bar1">
                      <div className="baramount" style={{ width: `${((p.selectedVehicle.breaks / 2) * 100).toString()}%` }} />
                    </div>
                  </p>
                </Paper>
                <Paper className='buysection'>
                  <div>
                    <h1 className='colortag'>Primary: {primaryColor}</h1>
                    <Grid container spacing={1} className="colorgrid" style={{marginTop:"-10px"}}>
                      <Grid xs={1} className="colorsplit" style= {{marginLeft: "25px"}}>
                        <div onClick={() => setprimaryColor('white')} className='colorcontainer' style={{ backgroundColor:"white"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('black')} className='colorcontainer' style={{ backgroundColor:"black"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('gray')} className='colorcontainer' style={{ backgroundColor:"gray"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('red')} className='colorcontainer' style={{ backgroundColor:"red"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('orange')} className='colorcontainer' style={{ backgroundColor:"orange"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('lime')} className='colorcontainer' style={{ backgroundColor:"lime"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('blue')} className='colorcontainer' style={{ backgroundColor:"blue"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setprimaryColor('purple')} className='colorcontainer' style={{ backgroundColor:"purple"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit" style= {{marginRight: "16px"}}>
                        <div onClick={() => setprimaryColor('yellow')} className='colorcontainer' style={{ backgroundColor:"yellow"}}></div>
                      </Grid>
                    </Grid>
                    <h1 className='colortag'>Secondary: {secondaryColor}</h1>
                    <Grid container spacing={1} className="colorgrid" style={{marginTop:"-10px"}}>
                      <Grid xs={1} className="colorsplit" style= {{marginLeft: "25px"}}>
                        <div onClick={() => setsecondaryColor('white')} className='colorcontainer' style={{ backgroundColor:"white"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('black')} className='colorcontainer' style={{ backgroundColor:"black"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('gray')} className='colorcontainer' style={{ backgroundColor:"gray"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('red')} className='colorcontainer' style={{ backgroundColor:"red"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('orange')} className='colorcontainer' style={{ backgroundColor:"orange"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('lime')} className='colorcontainer' style={{ backgroundColor:"lime"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('blue')} className='colorcontainer' style={{ backgroundColor:"blue"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit">
                        <div onClick={() => setsecondaryColor('purple')} className='colorcontainer' style={{ backgroundColor:"purple"}}></div>
                      </Grid>
                      <Grid xs={1} className="colorsplit" style= {{marginRight: "16px"}}>
                        <div onClick={() => setsecondaryColor('yellow')} className='colorcontainer' style={{ backgroundColor:"yellow"}}></div>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
                <Paper className='buysection2'>
                  <div>
                      <Button onClick={sendselectedvehicle} style={{color:"white"}} variant='contained'>View {p.selectedVehicle.label}</Button>
                  </div>
                </Paper>
              </div>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

type VehicleButtonProps = {
  vehicleInfo: Vehicle,
  onClick: (x: void) => void
}

const VehicleButtons: React.FC<VehicleButtonProps> = p => (
  <>
    <Grid xs={2} className="carbody" onClick={_ => p.onClick()}>
      <Item className="caritem">
        <img className="carImg" src={p.vehicleInfo.imglink || "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-classic-stuffed-peppers-horizontal-1538065876.jpg?crop=1xw:0.7498660953401178xh"}></img>
      </Item>
    </Grid>
  </>
)

const App: React.FC = () => {

  const [vehicleData, setvehicleData] = useState<Vehicle[] | null>(null)

  const [selectedVehicle, setselectedVehicle] = useState<Vehicle['model'] | null>(null)

  const [selectedCategory, setselectedCategory] = useState<Categoryx | null>(null)

  const vis = useVisibility()

  useEffect(() => {
    if (!vis.visible) {
      setselectedCategory(null)
      setselectedVehicle(null)
    }
  }, [vis.visible])

  const vehicleTypes = (cat: Categoryx) => (vehicleData ?? []).filter(x => x.category == cat)

  const selected = selectedCategory ? vehicleTypes(selectedCategory) : (vehicleData ?? [])

  const currentVehicle = selectedVehicle && selected.find(x => x.model === selectedVehicle)

  useEffect(() => {
    fetchNui<Vehicle[]>('getClientData', undefined, data).then(retData => {
      setvehicleData(retData)
    })
  })

  return (
    <div className="nui-wrapper">
      <div className='popup-thing'>
        <div>
          <Paper className="CategoryHeader">
            <ButtonGroup variant="text" aria-label="text button group" className='buttong'>
              <Button onClick={() => setselectedCategory(null)}>All </Button>
              <Button onClick={() => setselectedCategory('compacts')}>Compacts </Button>
              <Button onClick={() => setselectedCategory('coupes')}>Coupes </Button>
              <Button onClick={() => setselectedCategory('mc')}>Motorbikes </Button>
              <Button onClick={() => setselectedCategory('muscle')}>Muscle </Button>
              <Button onClick={() => setselectedCategory('offroad')}>Offroad </Button>
              <Button onClick={() => setselectedCategory('sedans')}>Sedans </Button>
              <Button onClick={() => setselectedCategory('sportsclassics')}>sportsclassics </Button>
              <Button onClick={() => setselectedCategory('sports')}>Sports </Button>
              <Button onClick={() => setselectedCategory('super')}>Super </Button>
              <Button onClick={() => setselectedCategory('suvs')}>Suvs </Button>
              <Button onClick={() => setselectedCategory('vans')}>Vans </Button>
            </ButtonGroup>
          </Paper>
          <br />
          <div>
            <Grid container spacing={1}>
              {<ShowSelectedVehicle selectedVehicle={currentVehicle || undefined} />}

              <Grid xs={2} md={9} className="vehiclelist">
                <Box sx={{ flexGrow: 0 }}>
                  <Grid container spacing={2}>
                    {vehicleData == null ? "Loading" : selected.map(x => <VehicleButtons vehicleInfo={x} onClick={_ => setselectedVehicle(x.model)} />)}
                  </Grid>
                </Box>
              </Grid>

            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
