const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export function decodeFecha(datestr,type = 'default'){
    if(datestr.indexOf("T")!=-1){
        const fulldatestr = datestr.split("T")
        const date = fulldatestr[0]
        const time = fulldatestr[1]
    
        const date_str = date.split("-")
        const ano = date_str[0]
        const mes = date_str[1]
        const dia = date_str[2]
        const time_str = time.split(":")
        const hora = (time_str[0]-5)
        const minutos = time_str[1]
        const segundos = parseInt(Number(time_str[2]))

        let fecha = '';

        const current_date = new Date();
        const current_year = current_date.getUTCFullYear()
        const current_month = current_date.getUTCMonth()+1
        const current_day = current_date.getUTCDate()

        switch (type){
            case 'year':
                fecha = ano;
            break;
            case 'month':
                fecha = mes;
            break;
            case 'Month':
                fecha = meses[Number(mes)-1];
            case 'day':
                fecha = dia;
            break;
            case 'fecha_solo':
                fecha = String(dia+' de '+meses[Number(mes)-1]+' de '+ano);
            break;
            case 'fecha_completa':
                fecha = String(dia+' de '+meses[Number(mes)-1]+' de '+ano+' a las '+hora+':'+minutos+':'+segundos);
            break;
            case 'default':
                fecha = String(dia+' de '+meses[Number(mes)-1]+' a las '+hora+':'+minutos);
            break;
            case 'code':
               fecha = String(ano+'/'+mes+'/'+dia+' '+hora+':'+minutos+':'+segundos); 
            break;
        };
        return fecha;
    }else{
        return '0000-00-00 00:00:00';
    }
}

export function statusData(job_status){
    const status = String(job_status).toLowerCase();
    let clase_status = 'failed';
    let percent = 0;
    if(status=='running'){
        clase_status = 'running';
        percent = 50;
    }else if(status=='done'){
        clase_status = 'done';
        percent = 100;
    }
    return {clase_status:clase_status,percent:percent}
}