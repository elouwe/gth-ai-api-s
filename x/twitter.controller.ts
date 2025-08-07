// x/twitter.controller.ts
// ===================== IMPORTS =====================
import { Request, Response } from 'express';
import { TwitterService } from './twitter.service';
import { SocialConnection } from './social-connection.entity';

export class TwitterController {
  constructor(private twitterService: TwitterService) {}

  async verifyFollow(req: Request, res: Response) {
    const { connection } = req.body;
    
    // ===================== VERIFICATION HEADER =====================
    console.log('\n═════════ TWITTER FOLLOW VERIFICATION ═════════');
    console.log(`✦ Connection ID: ${connection.id}`);
    console.log(`✦ User ID: ${connection.userId}`);
    
    try {
      const isValid = await this.twitterService.verifyFollow(connection);
      
      // ===================== VERIFICATION RESULT =====================
      console.log('\n─────── Result ───────');
      console.log(isValid ? '✅ Verified' : '❌ Not following');
      res.json({ success: isValid });
      
    } catch (error) {
      // ===================== ERROR HANDLER =====================
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.message}`);
      console.error('✦ Action: Check connection credentials');
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyRetweet(req: Request, res: Response) {
    const { connection, tweetId } = req.body;
    
    // ===================== VERIFICATION HEADER =====================
    console.log('\n═════════ TWITTER RETWEET VERIFICATION ═════════');
    console.log(`✦ Connection ID: ${connection.id}`);
    console.log(`✦ Tweet ID: ${tweetId}`);
    
    try {
      const isValid = await this.twitterService.verifyRetweet(connection, tweetId);
      
      // ===================== VERIFICATION RESULT =====================
      console.log('\n─────── Result ───────');
      console.log(isValid ? '✅ Verified' : '❌ Not retweeted');
      res.json({ success: isValid });
      
    } catch (error) {
      // ===================== ERROR HANDLER =====================
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.message}`);
      console.error('✦ Action: Check tweet visibility');
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyLike(req: Request, res: Response) {
    const { connection, tweetId } = req.body;
    
    // ===================== VERIFICATION HEADER =====================
    console.log('\n═════════ TWITTER LIKE VERIFICATION ═════════');
    console.log(`✦ Connection ID: ${connection.id}`);
    console.log(`✦ Tweet ID: ${tweetId}`);
    
    try {
      const isValid = await this.twitterService.verifyLike(connection, tweetId);
      
      // ===================== VERIFICATION RESULT =====================
      console.log('\n─────── Result ───────');
      console.log(isValid ? '✅ Verified' : '❌ Not liked');
      res.json({ success: isValid });
      
    } catch (error) {
      // ===================== ERROR HANDLER =====================
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.message}`);
      console.error('✦ Action: Check API permissions');
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findVerificationCode(req: Request, res: Response) {
    const { username, code } = req.body;
    
    // ===================== VERIFICATION HEADER =====================
    console.log('\n═════════ CODE SEARCH VERIFICATION ═════════');
    console.log(`✦ Username: @${username}`);
    console.log(`✦ Code: ${code.substring(0, 3)}...${code.slice(-3)}`);
    
    try {
      const found = await this.twitterService.findVerificationCodeInTweets(username, code);
      
      // ===================== VERIFICATION RESULT =====================
      console.log('\n─────── Result ───────');
      console.log(found ? '✅ Code found' : '❌ Code not found');
      res.json({ found });
      
    } catch (error) {
      // ===================== ERROR HANDLER =====================
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.message}`);
      console.error('✦ Action: Check username validity');
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
// ===================== END =====================