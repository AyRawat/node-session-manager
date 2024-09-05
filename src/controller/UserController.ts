import crypto from 'crypto';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Session } from '../entity/Session';



export class UserController {
  private userRepository = getRepository(User);
  private sessionRepository = getRepository(Session);

  async all() {
    return this.userRepository.find();
  }

 async one(request: Request, response: Response) {
    const mobileNumber = request.params.mobile; 
   console.log("The mobile Number", mobileNumber);
    try {
        const user = await this.userRepository.findOne({
            where: { mobile_number: mobileNumber },
            select: ['mobile_number', 'username', 'id']
        });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        
        console.log("User's id", user)
        const allSessions = await this.sessionRepository.find({
            where: { user: user.id },
            select: ['session_key', 'is_active']
        });
          console.log("The value of Sessions", allSessions)
     
        const activeSession = allSessions.find(session => session.is_active);

        const userDetails = {
            mobile_number: user.mobile_number,
            user_name: user.username,
            activeSession: activeSession ? activeSession.session_key : null,
            sessions: allSessions.map(session => ({ session: session.session_key }))
        };

        return response.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
}

  async save(request: Request, response:Response) {
    try {
      let {mobile_number , username} = request.body;
      let user = await this.userRepository.findOne({where: {mobile_number}})
      console.log("The value of user", user);
      
      if(user){
        await this.sessionRepository.update(
          {user, is_active:true},
          {is_active: false}
        )
      }else{
          user = this.userRepository.create({ mobile_number, username });
          await this.userRepository.save(user);
      }
        const session = this.sessionRepository.create({
      session_key: crypto.randomBytes(16).toString('hex'),
      user_agent: request.headers['user-agent'] || 'unknown',
      ip_address: request.ip || 'unknown',
      user_id: user.id,
      user
    });

    await this.sessionRepository.save(session);

    response.json({
      mobile_number: user.mobile_number,
      username: user.username,
      activeSession: session.session_key,
      sessions: [session.session_key]
    });
    } catch (err) {
      throw err;
    }
  }

}
