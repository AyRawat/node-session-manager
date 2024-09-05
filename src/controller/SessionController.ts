import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Session } from '../entity/Session';
import { NotFoundError } from '../common/errorValidation/errors';

export class SessionController {
    private sessionRepository = getRepository(Session);
    
    async all(userId: string) {
        try {
         const sessions =  this.sessionRepository.find({where: {user: userId}})    
         if(sessions){
                 return sessions
         }else{
            throw new NotFoundError();
         }
        } catch (error) {
            throw error;
        }
        
    }

    async one(request: Request) {
        try {
         const active_session = this.sessionRepository.findOne({where: {user: request.params.id, is_active: true}});
         if(active_session){
            return active_session;
         }else{
            throw new NotFoundError();
         }   
        } catch (error) {
            
        }
         
    }

    async save(request: Request){
        
    }
}