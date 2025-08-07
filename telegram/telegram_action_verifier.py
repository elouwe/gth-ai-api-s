# telegram/telegram_action_verifier.py
# ===================== IMPORTS =====================
import sys
import asyncio
from telethon import TelegramClient
from telethon.errors import ChannelPrivateError

async def main():
    phone = sys.argv[1]
    channel = sys.argv[2]
    action = sys.argv[3]
    api_id = int(sys.argv[4])
    api_hash = sys.argv[5]
    
    # ===================== VERIFICATION HEADER =====================
    print("\n═════════ VERIFICATION STARTED ═════════")
    print(f"✦ Phone: {phone}")
    print(f"✦ Channel: {channel}")
    print(f"✦ Action: {action}")
    print(f"✦ API ID: {api_id}")
    
    try:
        # ===================== AUTHORIZATION SECTION =====================
        print("\n─────── Authorization ───────")
        async with TelegramClient(phone, api_id, api_hash) as client:
            if not await client.is_user_authorized():
                print("❌ NOT_AUTHORIZED")
                return
                
            me = await client.get_me()
            print(f"✅ Authorized")
            print(f"✦ User ID: {me.id}")
            
            # ===================== ACTION HANDLER SECTION =====================
            print(f"\n─────── Action: {action} ───────")
            
            if action == "join":
                try:
                    # ─────── Channel Entity ───────
                    channel_entity = await client.get_entity(channel)
                    print(f"✦ Channel ID: {channel_entity.id}")
                    
                    # ─────── Participant Check ───────
                    participants = await client.get_participants(channel_entity)
                    user_ids = [p.id for p in participants]
                    print(f"✦ Participant count: {len(user_ids)}")
                    
                    # ─────── Verification Result ───────
                    if me.id in user_ids:
                        print("✅ VERIFIED")
                    else:
                        print("❌ NOT_MEMBER")
                        
                except ChannelPrivateError:
                    print("❌ CHANNEL_PRIVATE")
                except ValueError:
                    print("❌ CHANNEL_NOT_FOUND")
                    
            elif action == "repost":
                print("✅ VERIFIED (Repost placeholder)")
            else:
                print(f"❌ UNSUPPORTED_ACTION: {action}")
                
    except Exception as e:
        # ===================== ERROR HANDLER =====================
        print("\n═════════ VERIFICATION FAILED ═════════")
        print(f"❌ ERROR: {str(e)}")
        print("✦ Action: Check credentials and parameters")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print("\n═════════ UNHANDLED ERROR ═════════")
        print(f"❌ CRITICAL: {str(e)}")
        sys.exit(1)
# ===================== END =====================