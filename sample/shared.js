// Shared data + calculations for all EV-savings sample designs.
// Each sample brings its own aesthetic; logic and numbers are common.

const SHARED = (function(){

  const electricVehicles = [
    {segment:"Luxury",model:"Acura ZDX",range:304,kwh100:38},
    {segment:"Luxury",model:"Audi Q4 e-tron",range:265,kwh100:29},
    {segment:"Luxury",model:"Audi Q6 e-tron",range:307,kwh100:32},
    {segment:"Luxury",model:"Audi Q8 e-tron",range:222,kwh100:43},
    {segment:"Luxury",model:"BMW i4",range:301,kwh100:31},
    {segment:"Luxury",model:"BMW i5",range:295,kwh100:31},
    {segment:"Luxury",model:"BMW iX xDrive40",range:324,kwh100:39},
    {segment:"Luxury",model:"Cadillac LYRIQ",range:314,kwh100:37},
    {segment:"Luxury",model:"Cadillac OPTIQ",range:300,kwh100:32},
    {segment:"Sedan",model:"Chevrolet Bolt EV",range:259,kwh100:28},
    {segment:"SUV",model:"Chevrolet Equinox EV AWD",range:319,kwh100:33},
    {segment:"Pickup",model:"Chevrolet Silverado EV",range:440,kwh100:50},
    {segment:"Pickup",model:"Ford F-150 Lightning 4WD",range:320,kwh100:49},
    {segment:"SUV",model:"Ford Mustang Mach-E",range:312,kwh100:30},
    {segment:"Luxury",model:"Genesis G80 Electrified",range:282,kwh100:37},
    {segment:"Luxury",model:"Genesis GV60",range:248,kwh100:34},
    {segment:"Luxury",model:"Genesis GV70 Electrified",range:236,kwh100:37},
    {segment:"Pickup",model:"GMC Sierra EV",range:400,kwh100:52},
    {segment:"SUV",model:"Honda Prologue",range:296,kwh100:32},
    {segment:"SUV",model:"Hyundai Ioniq 5 Standard",range:303,kwh100:29},
    {segment:"Sedan",model:"Hyundai Ioniq 6 Long Range RWD",range:361,kwh100:24},
    {segment:"SUV",model:"Hyundai Kona Electric",range:261,kwh100:27},
    {segment:"SUV",model:"Kia EV6 Long Range RWD",range:310,kwh100:28},
    {segment:"SUV",model:"Kia EV9 Standard",range:304,kwh100:38},
    {segment:"SUV",model:"Kia Niro Electric",range:253,kwh100:29},
    {segment:"Luxury",model:"Lucid Air Pure RWD",range:420,kwh100:23},
    {segment:"Luxury",model:"Lucid Air Touring AWD",range:406,kwh100:26},
    {segment:"Luxury",model:"Mercedes-Benz EQE Sedan",range:305,kwh100:36},
    {segment:"Luxury",model:"Mercedes-Benz EQE SUV",range:279,kwh100:39},
    {segment:"Luxury",model:"Mercedes-Benz EQS 580 4MATIC",range:350,kwh100:36},
    {segment:"SUV",model:"Nissan Ariya",range:304,kwh100:33},
    {segment:"Sedan",model:"Polestar 2",range:270,kwh100:31},
    {segment:"Luxury",model:"Polestar 3",range:315,kwh100:41},
    {segment:"SUV",model:"Rivian R1S Dual Standard",range:321,kwh100:40},
    {segment:"Pickup",model:"Rivian R1T Dual Standard",range:328,kwh100:40},
    {segment:"Sedan",model:"Tesla Model 3 RWD",range:272,kwh100:25},
    {segment:"Sedan",model:"Tesla Model 3 SR",range:272,kwh100:25},
    {segment:"Luxury",model:"Tesla Model S",range:405,kwh100:28},
    {segment:"SUV",model:"Tesla Model Y",range:310,kwh100:28},
    {segment:"SUV",model:"Toyota bZ4X FWD",range:252,kwh100:28},
    {segment:"SUV",model:"Volkswagen ID.4",range:275,kwh100:31},
    {segment:"SUV",model:"Volkswagen ID. Buzz",range:234,kwh100:39}
  ];

  const gasVehicles = [
    {segment:"Sedan",model:"BMW 330i",gal100:3.2},
    {segment:"Luxury",model:"BMW 740i",gal100:3.6},
    {segment:"Luxury",model:"BMW X5 xDrive40i",gal100:4.0},
    {segment:"Luxury",model:"BMW X7 xDrive40i",gal100:4.55},
    {segment:"Luxury",model:"Cadillac XT5",gal100:4.2},
    {segment:"Luxury",model:"Chevrolet Corvette",gal100:5.3},
    {segment:"SUV",model:"Chevrolet Equinox FWD",gal100:3.7},
    {segment:"Pickup",model:"Chevrolet Silverado 4WD",gal100:5.6},
    {segment:"Pickup",model:"Chevrolet Silverado 2WD",gal100:5.3},
    {segment:"SUV",model:"Ford Escape",gal100:3.3},
    {segment:"SUV",model:"Ford Explorer RWD",gal100:4.3},
    {segment:"Pickup",model:"Ford F-150 4WD Hybrid",gal100:4.3},
    {segment:"Pickup",model:"Ford F-150 2WD",gal100:4.8},
    {segment:"Luxury",model:"Genesis GV70 2.5T",gal100:4.2},
    {segment:"Sedan",model:"Honda Accord",gal100:3.1},
    {segment:"Sedan",model:"Honda Accord Hybrid",gal100:2.1},
    {segment:"Sedan",model:"Honda Civic",gal100:2.8},
    {segment:"SUV",model:"Hyundai Kona",gal100:3.2},
    {segment:"SUV",model:"Hyundai Tucson",gal100:3.6},
    {segment:"SUV",model:"Kia Sportage",gal100:3.6},
    {segment:"SUV",model:"Mazda CX-5",gal100:3.6},
    {segment:"Luxury",model:"Mercedes-Benz GLC 300",gal100:3.6},
    {segment:"Luxury",model:"Mercedes-Benz S 500",gal100:4.2},
    {segment:"SUV",model:"Nissan Pathfinder",gal100:4.3},
    {segment:"Sedan",model:"Nissan Altima",gal100:3.1},
    {segment:"SUV",model:"Nissan Rogue",gal100:3.0},
    {segment:"Sedan",model:"Nissan Sentra",gal100:3.0},
    {segment:"SUV",model:"Subaru Outback",gal100:3.6},
    {segment:"Sedan",model:"Toyota Camry",gal100:3.1},
    {segment:"Sedan",model:"Toyota Camry Hybrid",gal100:1.9},
    {segment:"SUV",model:"Toyota RAV4",gal100:3.3},
    {segment:"SUV",model:"Toyota RAV4 Hybrid",gal100:2.5},
    {segment:"SUV",model:"Toyota Highlander",gal100:4.0},
    {segment:"SUV",model:"Toyota 4Runner",gal100:5.3},
    {segment:"SUV",model:"Toyota Sequoia",gal100:4.5},
    {segment:"SUV",model:"Honda CR-V",gal100:3.2},
    {segment:"SUV",model:"Honda Pilot",gal100:4.0},
    {segment:"SUV",model:"Volkswagen Tiguan",gal100:3.6}
  ];

  const electricityPrices = {
    "National":17.78,"Alabama":14.91,"Alaska":26.18,"Arizona":15.66,"Arkansas":13.22,
    "California":31.91,"Colorado":16.35,"Connecticut":27.02,"Delaware":18.81,
    "District of Columbia":22.72,"Florida":15.78,"Georgia":14.42,"Hawaii":40.20,
    "Idaho":12.25,"Illinois":18.31,"Indiana":17.41,"Iowa":13.55,"Kansas":15.10,
    "Kentucky":13.70,"Louisiana":12.74,"Maine":27.85,"Maryland":21.34,
    "Massachusetts":31.22,"Michigan":19.94,"Minnesota":15.67,"Mississippi":15.33,
    "Missouri":13.12,"Montana":12.82,"Nebraska":12.52,"Nevada":14.20,
    "New Hampshire":27.37,"New Jersey":22.73,"New Mexico":15.61,"New York":26.49,
    "North Carolina":14.64,"North Dakota":11.93,"Ohio":17.66,"Oklahoma":13.34,
    "Oregon":15.59,"Pennsylvania":20.17,"Rhode Island":30.82,"South Carolina":15.53,
    "South Dakota":13.81,"Tennessee":13.47,"Texas":16.04,"Utah":13.07,
    "Vermont":24.17,"Virginia":15.94,"Washington":13.85,"West Virginia":15.65,
    "Wisconsin":18.39,"Wyoming":13.91
  };

  // AAA state averages, updated July 8, 2026
  const gasPrices = {
    "National":3.796,"Alabama":3.466,"Alaska":4.729,"Arizona":3.904,"Arkansas":3.451,
    "California":5.364,"Colorado":3.663,"Connecticut":3.896,"Delaware":3.731,"District of Columbia":4.068,
    "Florida":3.716,"Georgia":3.557,"Hawaii":5.458,"Idaho":4.004,"Illinois":3.993,
    "Indiana":3.064,"Iowa":3.483,"Kansas":3.469,"Kentucky":3.375,"Louisiana":3.453,
    "Maine":3.844,"Maryland":3.758,"Massachusetts":3.863,"Michigan":3.886,"Minnesota":3.630,
    "Mississippi":3.437,"Missouri":3.493,"Montana":3.896,"Nebraska":3.599,"Nevada":4.547,
    "New Hampshire":3.827,"New Jersey":3.862,"New Mexico":3.811,"New York":4.051,"North Carolina":3.488,
    "North Dakota":3.592,"Ohio":3.535,"Oklahoma":3.338,"Oregon":4.538,"Pennsylvania":3.982,
    "Rhode Island":3.755,"South Carolina":3.462,"South Dakota":3.656,"Tennessee":3.404,"Texas":3.353,
    "Utah":3.863,"Vermont":3.962,"Virginia":3.660,"Washington":5.004,"West Virginia":3.692,
    "Wisconsin":3.550,"Wyoming":3.821
  };

  const stateAbbr = {Alabama:"AL",Alaska:"AK",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE","District of Columbia":"DC",Florida:"FL",Georgia:"GA",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND",Ohio:"OH",Oklahoma:"OK",Oregon:"OR",Pennsylvania:"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT",Virginia:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY"};

  const matchedPairs = [
    {ev:"Chevrolet Bolt EV",gas:"Honda Civic",segment:"Sedan",tier:"Under $35k"},
    {ev:"Hyundai Ioniq 6 Long Range RWD",gas:"Honda Accord",segment:"Sedan",tier:"$35–50k"},
    {ev:"Tesla Model 3 RWD",gas:"Toyota Camry",segment:"Sedan",tier:"$35–50k"},
    {ev:"BMW i4",gas:"BMW 330i",segment:"Sedan",tier:"$50–75k"},
    {ev:"Tesla Model S",gas:"BMW 740i",segment:"Sedan",tier:"$75k+"},
    {ev:"Hyundai Kona Electric",gas:"Hyundai Kona",segment:"Small SUV",tier:"Under $35k"},
    {ev:"Chevrolet Equinox EV AWD",gas:"Chevrolet Equinox FWD",segment:"Small SUV",tier:"Under $35k"},
    {ev:"Tesla Model Y",gas:"Toyota RAV4",segment:"Small SUV",tier:"$35–50k"},
    {ev:"Ford Mustang Mach-E",gas:"Ford Escape",segment:"Small SUV",tier:"$35–50k"},
    {ev:"Genesis GV60",gas:"Genesis GV70 2.5T",segment:"Small SUV",tier:"$50–75k"},
    {ev:"Nissan Ariya",gas:"Nissan Rogue",segment:"Large SUV",tier:"$35–50k"},
    {ev:"Kia EV9 Standard",gas:"Subaru Outback",segment:"Large SUV",tier:"$50–75k"},
    {ev:"Volkswagen ID. Buzz",gas:"Volkswagen Tiguan",segment:"Large SUV",tier:"$50–75k"},
    {ev:"Cadillac LYRIQ",gas:"Cadillac XT5",segment:"Large SUV",tier:"$50–75k"},
    {ev:"BMW iX xDrive40",gas:"BMW X5 xDrive40i",segment:"Large SUV",tier:"$75k+"},
    {ev:"Chevrolet Silverado EV",gas:"Chevrolet Silverado 4WD",segment:"Pickup",tier:"$50–75k"},
    {ev:"Ford F-150 Lightning 4WD",gas:"Ford F-150 2WD",segment:"Pickup",tier:"$50–75k"},
    {ev:"GMC Sierra EV",gas:"Chevrolet Silverado 4WD",segment:"Pickup",tier:"$75k+"}
  ];

  const brandPairs = [
    {gas:"Toyota Camry",ev:"Hyundai Ioniq 6 Long Range RWD",brand:"Toyota",tier:"Under $35k"},
    {gas:"Toyota RAV4",ev:"Chevrolet Equinox EV AWD",brand:"Toyota",tier:"Under $35k"},
    {gas:"Toyota Camry",ev:"Tesla Model 3 RWD",brand:"Toyota",tier:"$35–50k"},
    {gas:"Toyota RAV4",ev:"Tesla Model Y",brand:"Toyota",tier:"$35–50k"},
    {gas:"Toyota Highlander",ev:"Kia EV9 Standard",brand:"Toyota",tier:"$50–75k"},
    {gas:"Toyota 4Runner",ev:"Rivian R1S Dual Standard",brand:"Toyota",tier:"$75k+"},
    {gas:"Honda Civic",ev:"Chevrolet Bolt EV",brand:"Honda",tier:"Under $35k"},
    {gas:"Honda CR-V",ev:"Chevrolet Equinox EV AWD",brand:"Honda",tier:"Under $35k"},
    {gas:"Honda Accord",ev:"Tesla Model 3 RWD",brand:"Honda",tier:"$35–50k"},
    {gas:"Honda Pilot",ev:"Kia EV9 Standard",brand:"Honda",tier:"$50–75k"},
    {gas:"Ford Escape",ev:"Hyundai Kona Electric",brand:"Ford",tier:"Under $35k"},
    {gas:"Ford Escape",ev:"Ford Mustang Mach-E",brand:"Ford",tier:"$35–50k"},
    {gas:"Ford Explorer RWD",ev:"Kia EV9 Standard",brand:"Ford",tier:"$50–75k"},
    {gas:"Ford F-150 2WD",ev:"Ford F-150 Lightning 4WD",brand:"Ford",tier:"$50–75k"},
    {gas:"Chevrolet Equinox FWD",ev:"Chevrolet Equinox EV AWD",brand:"Chevy",tier:"Under $35k"},
    {gas:"Chevrolet Equinox FWD",ev:"Tesla Model Y",brand:"Chevy",tier:"$35–50k"},
    {gas:"Chevrolet Silverado 4WD",ev:"Chevrolet Silverado EV",brand:"Chevy",tier:"$50–75k"},
    {gas:"Hyundai Kona",ev:"Hyundai Kona Electric",brand:"HMG",tier:"Under $35k"},
    {gas:"Kia Sportage",ev:"Kia EV6 Long Range RWD",brand:"HMG",tier:"$35–50k"},
    {gas:"Hyundai Tucson",ev:"Hyundai Ioniq 5 Standard",brand:"HMG",tier:"$35–50k"},
    {gas:"Subaru Outback",ev:"Kia EV9 Standard",brand:"HMG",tier:"$50–75k"},
    {gas:"Nissan Sentra",ev:"Chevrolet Bolt EV",brand:"Nissan",tier:"Under $35k"},
    {gas:"Nissan Rogue",ev:"Chevrolet Equinox EV AWD",brand:"Nissan",tier:"Under $35k"},
    {gas:"Nissan Rogue",ev:"Nissan Ariya",brand:"Nissan",tier:"$35–50k"},
    {gas:"Nissan Altima",ev:"Tesla Model 3 RWD",brand:"Nissan",tier:"$35–50k"},
    {gas:"Nissan Pathfinder",ev:"Kia EV9 Standard",brand:"Nissan",tier:"$50–75k"},
    {gas:"Volkswagen Tiguan",ev:"Volkswagen ID.4",brand:"VW",tier:"Under $35k"},
    {gas:"Volkswagen Tiguan",ev:"Volkswagen ID. Buzz",brand:"VW",tier:"$50–75k"},
    {gas:"BMW 330i",ev:"Tesla Model 3 RWD",brand:"BMW",tier:"$35–50k"},
    {gas:"BMW 330i",ev:"BMW i4",brand:"BMW",tier:"$50–75k"},
    {gas:"BMW X5 xDrive40i",ev:"BMW iX xDrive40",brand:"BMW",tier:"$75k+"},
    {gas:"BMW 740i",ev:"Tesla Model S",brand:"BMW",tier:"$75k+"},
    {gas:"Mercedes-Benz GLC 300",ev:"Genesis GV60",brand:"Mercedes",tier:"$50–75k"},
    {gas:"Mercedes-Benz S 500",ev:"Mercedes-Benz EQS 580 4MATIC",brand:"Mercedes",tier:"$75k+"}
  ];

  // Peak 2022 scenario
  const PEAK_NATL = 5.03, CURR_NATL = 3.796;
  const peak2022 = {California:6.44,Washington:5.56,Oregon:5.55,Hawaii:5.62,
    Nevada:5.65,Alaska:5.61,Illinois:5.56,Michigan:5.22,Indiana:5.22,"New York":5.05};

  // Base e-gallon parameters (Kona vs Kona EV)
  const KWH_PER_GAL_EQUIV = 27 / 3.2; // 8.4375

  // --- Getters ---
  function getGasPrice(state, scenario){
    const base = gasPrices[state];
    if (base == null) return null;
    if (scenario === 'peak2022'){
      if (peak2022[state] != null) return peak2022[state];
      return base * (PEAK_NATL / CURR_NATL);
    }
    return base;
  }

  function getElecPrice(state){ return electricityPrices[state] ?? null; } // cents/kWh

  function eGallon(state){
    const ep = getElecPrice(state);
    if (ep == null) return null;
    return (ep / 100) * KWH_PER_GAL_EQUIV;
  }

  // City/highway adjustment factor — combined EPA, then skew:
  // EVs do better in city (regen), gas does worse. Return { evAdj, gasAdj }
  function cityHwyAdj(cityPct){
    // cityPct 0..100.  At 55 (default), both = 1.0. Swing ±8%.
    const skew = (cityPct - 55) / 100;
    return {
      evAdj:  1 - skew * 0.08,   // more city → lower kWh/100mi → cheaper
      gasAdj: 1 + skew * 0.10    // more city → worse mpg → pricier
    };
  }

  function findEV(model){ return electricVehicles.find(v => v.model === model); }
  function findGas(model){ return gasVehicles.find(v => v.model === model); }

  function costPer100(evModel, gasModel, state, scenario, cityPct){
    const ev = findEV(evModel), gas = findGas(gasModel);
    const ep = getElecPrice(state), gp = getGasPrice(state, scenario);
    if (!ev || !gas || ep == null || gp == null) return null;
    const adj = cityHwyAdj(cityPct ?? 55);
    const evCost = (ep * ev.kwh100 * adj.evAdj) / 100;         // ¢/kWh × kWh/100mi / 100 = $
    const gasCost = gp * gas.gal100 * adj.gasAdj;              // $/gal × gal/100mi
    return { evCost, gasCost, evAnnual:(m)=>evCost*m/100, gasAnnual:(m)=>gasCost*m/100 };
  }

  // Maintenance schedule (simplified)
  function maintCost(segment, years){
    const base = {
      Sedan:    {ice:3410, ev:1570},
      'Small SUV': {ice:3780, ev:1690},
      SUV:      {ice:3780, ev:1690},
      'Large SUV': {ice:4120, ev:1840},
      Pickup:   {ice:4720, ev:2110},
      Luxury:   {ice:5310, ev:2390}
    }[segment] || {ice:3410, ev:1570};
    const scale = years / 5;
    return { ice: Math.round(base.ice * scale), ev: Math.round(base.ev * scale), delta: Math.round((base.ice - base.ev) * scale) };
  }

  const fmt$ = n => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString();
  const fmt$2 = n => '$' + n.toFixed(2);
  const fmtK = n => (n/1000) + 'k';

  // LocalStorage persistence
  const STORE_KEY = 'evsavings_shared_v1';
  function save(partial){
    const cur = load();
    const next = Object.assign({}, cur, partial);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch(e){}
  }
  function load(){
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch(e){ return {}; }
  }

  // Populate grouped optgroups
  function populateSelect(sel, vehicles, defaultModel, showEff){
    const groups = {};
    const order = ['Sedan','SUV','Pickup','Luxury'];
    vehicles.forEach(v => { (groups[v.segment] = groups[v.segment] || []).push(v); });
    order.forEach(seg => {
      if (!groups[seg]) return;
      const grp = document.createElement('optgroup');
      grp.label = seg === 'Pickup' ? 'Pickups' : seg === 'Sedan' ? 'Sedans' : seg === 'SUV' ? 'SUVs & Crossovers' : 'Luxury';
      groups[seg].sort((a,b) => a.model.localeCompare(b.model)).forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.model;
        opt.textContent = showEff ? `${v.model} (${v.gal100} gal/100mi)` : `${v.model} (${v.range} mi)`;
        if (v.model === defaultModel) opt.selected = true;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    });
  }

  function populateStateSelect(sel, defaultState){
    const names = Object.keys(stateAbbr).sort();
    names.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name; opt.textContent = name + ' (' + stateAbbr[name] + ')';
      if (name === defaultState) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  // D3 choropleth draw helper. Expects d3 + topojson globals loaded.
  // colorFn(stateName) -> hex. labelFn(stateName) -> string (or null). onClick(stateName, event).
  function drawMap(containerId, opts){
    const c = document.getElementById(containerId);
    if (!c) return;
    const width = c.clientWidth || 900, height = opts.height || 500;
    c.innerHTML = '';
    const svg = d3.select('#'+containerId).append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio','xMidYMid meet')
      .style('width','100%').style('height','100%');
    return d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
      const proj = d3.geoAlbersUsa().fitSize([width, height], topojson.feature(us, us.objects.states));
      const path = d3.geoPath().projection(proj);
      const paths = svg.selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .join('path')
        .attr('d', path)
        .attr('fill', d => opts.colorFn(d.properties.name) || '#ddd')
        .attr('stroke', opts.strokeColor || '#000')
        .attr('stroke-width', opts.strokeWidth || 1)
        .style('cursor','pointer');
      if (opts.onClick) {
        paths.on('click', (event, d) => opts.onClick(d.properties.name, event));
      }
      if (opts.onHover) {
        paths
          .on('mouseover', function(event, d){ opts.onHover(d.properties.name, event, this, true); })
          .on('mouseout',  function(event, d){ opts.onHover(d.properties.name, event, this, false); });
      }
      if (opts.labelFn) {
        svg.selectAll('text')
          .data(topojson.feature(us, us.objects.states).features)
          .join('text')
          .attr('x', d => path.centroid(d)[0])
          .attr('y', d => path.centroid(d)[1])
          .attr('text-anchor','middle').attr('dy','0.35em')
          .attr('pointer-events','none')
          .attr('font-family', opts.labelFont || 'inherit')
          .attr('font-size', opts.labelSize || '11px')
          .attr('font-weight','700')
          .attr('fill', d => opts.labelColor ? opts.labelColor(d.properties.name) : '#000')
          .text(d => opts.labelFn(d.properties.name) || '');
      }
      return { svg, paths };
    });
  }

  return {
    electricVehicles, gasVehicles, electricityPrices, gasPrices, stateAbbr,
    matchedPairs, brandPairs, peak2022,
    getGasPrice, getElecPrice, eGallon, cityHwyAdj, findEV, findGas,
    costPer100, maintCost,
    fmt$, fmt$2, fmtK,
    save, load,
    populateSelect, populateStateSelect,
    drawMap
  };
})();
