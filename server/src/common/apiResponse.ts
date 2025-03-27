export function successResponse<T>(message?:string,data?:T){
    return {
        success:true,
        message,
        data
    }
}

export function errorResponse<T>(message?:string,data?:T){
    return {
        success:false,
        message,
        data
    }
}