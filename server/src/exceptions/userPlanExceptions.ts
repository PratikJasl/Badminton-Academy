type EXCEPTION_NAME=|"ACTIVE_PLAN_EXISTS"|"INVALID_PLAN_END_DATE";

export class UserPlanExceptions extends Error{
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
       this.name=name;
       this.message=message;
       this.cause="caused by: "+cause;

   }
}
