const search = document.getElementById('search');
const matchListDep = document.getElementById('match-list-dep');
const matchListCit = document.getElementById('match-list-cit');
const divider = document.getElementById('search-divider');
// global var just for the main search data
dep = [];
cities= [];


const searchDepartamentos = async searchText => {    
    const testSearch = searchText.toLocaleLowerCase().trim();     
    //obtener matches 
    // avoid to calculate the search just with one letter 
    if(searchText.length >= 2){
     let departamento = dep.filter( d => {       
        return d.toLocaleLowerCase().includes(testSearch)

    });
    let ciudades = cities.filter( c => {        
         return c.toLocaleLowerCase().includes(testSearch); 

    });
    outputHtml({departamento,ciudades});
   }else{
      // pass empty arrays 
    outputHtml({departamento:[],ciudades:[]});
   }
       
    
};

async function getJsondata () {
    const res = await fetch ('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json');
    const departamentos = await res.json();
    // map the cities and states separately
    dep = departamentos.map( place => {        
        return place.departamento ;

    });
    cities = departamentos.map( place => {        
        return place.ciudades; 

    }).flat();
    
}

//mostrar resultado
const outputHtml =matches =>  {
    const {departamento,ciudades} = matches;
    // check valid data and records and proceed accordingly
    if(departamento.length) {
        matchListDep.innerHTML = `<strong>Departamento en esta busqueda </strong><br/>`;
        const depHtml = departamento.map(dep => `
            <div class="card card-body">
                <h4> ${dep} </h4>
            </div>
        `).join('');
        matchListDep.innerHTML += depHtml;
    }else{
        matchListDep.innerHTML = ``;
    }
    if(ciudades.length) {
        divider.hidden = false;
            matchListCit.innerHTML = `<strong>Ciudades en esta busqueda </strong><br>`;
            const ciuHtml = ciudades.map(c => `
            <div class="card card-body">
                <h4> ${c} </h4>
            </div>
        `).join('');
        matchListCit.innerHTML += ciuHtml;
    }else{
        divider.hidden = true;
        matchListCit.innerHTML = ``;
    }
    
};
// get data just once
this.getJsondata();
search.addEventListener('input',() => searchDepartamentos(search.value) );