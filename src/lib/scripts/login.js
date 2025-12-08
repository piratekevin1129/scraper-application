
export function focusLoginInput(event){
    event.target.parentNode.className = 'login-form-group login-form-group-over'
}
export function blurLoginInput(event){
    if(event.target.value.trim()==''){
        event.target.parentNode.className = 'login-form-group'
    }else{
        event.target.parentNode.className = 'login-form-group login-form-group-ready'
    }
}

export function togglePasswordStatus(event){
    const btn = event.currentTarget
    const status = btn.getAttribute('status')
    const input = btn.parentNode.getElementsByTagName('input')[0]
    
    let current_class = btn.className
    let new_class = ''
    if(status=='hide'){
        input.setAttribute('type','text')
        btn.setAttribute('status','show')
        new_class = current_class.replace('hide','show')
    }else{
        input.setAttribute('type','password')
        btn.setAttribute('status','hide')
        new_class = current_class.replace('show','hide')
    }
    btn.className = new_class
}
