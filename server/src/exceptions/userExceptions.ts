type EXCEPTION_NAME=|"USER_INACTIVE"|"USER_NOT_VERIFIED"|"USER_NOT_EXIST";

export class UserExceptions extends Error{
    name:EXCEPTION_NAME;
    message:string;
    cause:any;

   constructor({
    name,
    message,
    cause
   }:{
    name:EXCEPTION_NAME;
    message:string;
    cause:any;
   }){
       super();
       this.name = name;
       this.message = message;
       this.cause="caused by: "+cause;
   }
}
