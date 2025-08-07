// x/twitter.controller.ts
// ===================== IMPORTS =====================
import axios from 'axios';
import dotenv from 'dotenv';
import { SocialConnection } from './social-connection.entity';

dotenv.config();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN!;
const GOTHAM_TWITTER_ID = process.env.GOTHAM_TWITTER_ID!;

export class TwitterService {
  // ===================== USER ID RESOLVER =====================
  async getUserIdByUsername(username: string): Promise<string | null> {
    console.log(`\n─────── Resolving User ID ───────`);
    console.log(`✦ Username: @${username}`);
    
    try {
      const response = await axios.get(
        `https://api.twitter.com/2/users/by/username/${username}`,
        { headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` } }
      );
      
      const userId = response.data.data?.id || null;
      console.log(userId ? `✅ Resolved ID: ${userId}` : '❌ User not found');
      return userId;
      
    } catch (error) {
      console.error('\n═════════ RESOLUTION FAILED ═════════');
      console.error(`❌ Error: ${error.response?.data?.title || error.message}`);
      console.error(`✦ Status: ${error.response?.status || 'N/A'}`);
      return null;
    }
  }

  // ===================== FOLLOW VERIFICATION =====================
  async verifyFollow(connection: SocialConnection): Promise<boolean> {
    console.log(`\n═════════ Verifying Follow ═════════`);
    console.log(`✦ Account: @${connection.twitterUsername}`);
    console.log(`✦ Target: @${GOTHAM_TWITTER_ID}`);
    
    try {
      const userId = await this.getUserIdByUsername(connection.twitterUsername!);
      if (!userId) return false;

      const response = await axios.get(
        `https://api.twitter.com/2/users/${userId}/following`,
        {
          headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
          params: { max_results: 1000, "user.fields": "username" }
        }
      );
      
      const targetUser = GOTHAM_TWITTER_ID.replace('@', '');
      const isFollowing = response.data.data?.some(
        (user: any) => user.username === targetUser
      ) || false;
      
      console.log(isFollowing ? '✅ Following' : '❌ Not following');
      console.log(`✦ Followers checked: ${response.data.data?.length || 0}`);
      return isFollowing;
      
    } catch (error) {
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.response?.data?.title || error.message}`);
      console.error(`✦ Action: Check API permissions`);
      return false;
    }
  }

  // ===================== RETWEET VERIFICATION =====================
  async verifyRetweet(
    connection: SocialConnection,
    tweetId: string
  ): Promise<boolean> {
    console.log(`\n═════════ Verifying Retweet ═════════`);
    console.log(`✦ Account: @${connection.twitterUsername}`);
    console.log(`✦ Tweet ID: ${tweetId}`);
    
    try {
      const userId = await this.getUserIdByUsername(connection.twitterUsername!);
      if (!userId) return false;

      const response = await axios.get(
        `https://api.twitter.com/2/users/${userId}/tweets`,
        {
          headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
          params: {
            max_results: 100,
            exclude: "replies",
            expansions: "referenced_tweets.id",
            "tweet.fields": "referenced_tweets"
          }
        }
      );

      const hasRetweeted = response.data.data?.some((tweet: any) => 
        tweet.referenced_tweets?.some(
          (ref: any) => ref.type === "retweeted" && ref.id === tweetId
        )
      ) || false;
      
      console.log(hasRetweeted ? '✅ Retweet found' : '❌ Retweet not found');
      console.log(`✦ Tweets scanned: ${response.data.data?.length || 0}`);
      return hasRetweeted;
      
    } catch (error) {
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.response?.data?.title || error.message}`);
      console.error(`✦ Action: Check tweet visibility`);
      return false;
    }
  }

  // ===================== LIKE VERIFICATION =====================
  async verifyLike(
    connection: SocialConnection,
    tweetId: string
  ): Promise<boolean> {
    console.log(`\n═════════ Verifying Like ═════════`);
    console.log(`✦ Account: @${connection.twitterUsername}`);
    console.log(`✦ Tweet ID: ${tweetId}`);
    
    try {
      const userId = await this.getUserIdByUsername(connection.twitterUsername!);
      if (!userId) return false;

      const response = await axios.get(
        `https://api.twitter.com/2/tweets/${tweetId}/liking_users`,
        {
          headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
          params: { max_results: 1000, "user.fields": "username" }
        }
      );

      const hasLiked = response.data.data?.some(
        (user: any) => user.username === connection.twitterUsername
      ) || false;
      
      console.log(hasLiked ? '✅ Like found' : '❌ Like not found');
      console.log(`✦ Likes checked: ${response.data.data?.length || 0}`);
      return hasLiked;
      
    } catch (error) {
      console.error('\n═════════ VERIFICATION FAILED ═════════');
      console.error(`❌ Error: ${error.response?.data?.title || error.message}`);
      console.error(`✦ Action: Check API permissions`);
      return false;
    }
  }

  // ===================== CODE SEARCH =====================
  async findVerificationCodeInTweets(
    username: string,
    code: string
  ): Promise<boolean> {
    const maskedCode = `${code.substring(0, 2)}...${code.slice(-2)}`;
    
    console.log(`\n═════════ Searching for Code ═════════`);
    console.log(`✦ Account: @${username}`);
    console.log(`✦ Code: ${maskedCode}`);
    
    try {
      const response = await axios.get(
        `https://api.twitter.com/2/tweets/search/recent`,
        {
          headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
          params: { query: `from:${username} ${code}`, max_results: 10 }
        }
      );
      
      const found = response.data.meta?.result_count > 0;
      console.log(found ? '✅ Code found' : '❌ Code not found');
      console.log(`✦ Results: ${response.data.meta?.result_count || 0} matches`);
      return found;
      
    } catch (error) {
      console.error('\n═════════ SEARCH FAILED ═════════');
      console.error(`❌ Error: ${error.response?.data?.title || error.message}`);
      console.error(`✦ Action: Check search parameters`);
      return false;
    }
  }
}
// ===================== END =====================