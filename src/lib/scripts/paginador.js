const limit_rows = 2;
let html_paginador = '';
let pages = [];
export function sePaginador(){
    let rows_table_all = document.getElementById(table_id).getElementsByTagName('tbdoy')[0].getElementsByTagName('tr')
    
    for(let i = 0;i<limit_rows;i++){
        pages = [...pages,i];
        rows_table_all.setAttribute("class",'tr-filter-visible')
    }
    for(let i = limit_rows;i<rows_table_all.length;i++){
        rows_table_all.setAttribute("class",'tr-filter-hidden')
    }
}

export function setPaginadorCollection(arreglo,limite){
    let pagina = 0;
    let start_page = 0;
    let fin_page = limite;
    let collection = [];

    while(pagina<arreglo.length){
        let coll = [];
        if(fin_page>arreglo.length){
            fin_page = arreglo.length;
        }
        for(let i = start_page;i<fin_page;i++){
            coll.push(arreglo[pagina]);
            pagina++;
        }
        collection.push(coll);

        start_page += limite;
        fin_page += limite;
    }

    return collection;
}