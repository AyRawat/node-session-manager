import crypto from 'crypto';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Session } from '../entity/Session';
import { NotFoundError } from '../common/errorValidation/errors';

// import { streamUpload } from '../utils/mediaUpload';

export class UserController {
  private userRepository = getRepository(User);
  private sessionRepository = getRepository(Session);

  async all() {
    return this.userRepository.find();
  }

     async one(request: Request, response: Response) {
        const userId = request.params.id;
        try {
            // Fetch the user by ID, including only relevant fields
            const user = await this.userRepository.findOne({
                where: { id: userId },
                select: ['mobile_number', 'username']
            });

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // Fetch all active sessions for the user, including only session_key
         const allSessions = await this.sessionRepository.find({
            where: { user: userId },
            select: ['session_key', 'is_active']
        });

   // Find the active session (if any)
        const activeSession = allSessions.find(session => session.is_active);

             // Prepare the user details response
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

  // using query builder <createQueryBuilder>
  async remove(request: Request, response: Response) {
    try {
      const data = await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id: request.params.id })
        .execute();
      if (data.affected === 1) {
        return 'record successfully deleted';
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      throw err;
    }
  }
}
