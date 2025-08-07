# telegram/telegram_verifier.py
# ===================== IMPORTS =====================
import sys
import asyncio
from telethon import TelegramClient
from telethon.errors import SessionPasswordNeededError

async def main():
    phone = sys.argv[1]
    code = sys.argv[2]
    api_id = int(sys.argv[3])
    api_hash = sys.argv[4]
    
    # ===================== VERIFICATION HEADER =====================
    print("\n═════════ VERIFICATION STARTED ═════════")
    print(f"✦ Phone: {phone}")
    print(f"✦ Verification code: {code}")
    print(f"✦ API ID: {api_id}")
    
    try:
        # ===================== AUTHORIZATION SECTION =====================
        print("\n─────── Authorization ───────")
        async with TelegramClient(phone, api_id, api_hash) as client:
            if not await client.is_user_authorized():
                print("❌ NOT_AUTHORIZED")
                print("✦ Action: Check session or login credentials")
                return
                
            me = await client.get_me()
            print("✅ Authorized")
            print(f"✦ User: {me.first_name or ''} {me.last_name or ''}".strip())
            if me.username:
                print(f"✦ Username: @{me.username}")
            print(f"✦ User ID: {me.id}")
            
            # ===================== BIO VERIFICATION SECTION =====================
            print("\n─────── Bio Verification ───────")
            print(f"✦ Searching for code: '{code}'")
            
            bio_content = me.about or ""
            if code in bio_content:
                print("✅ VERIFIED")
                print(f"✦ Bio content: '{bio_content}'")
            else:
                print("❌ NOT_FOUND")
                print(f"✦ Bio content: '{bio_content}'")
                print("✦ Action: Add code to your Telegram bio")
                
    except SessionPasswordNeededError:
        # ===================== 2FA ERROR HANDLER =====================
        print("\n═════════ SECURITY ALERT ═════════")
        print("❌ NEED_2FA")
        print("✦ Action: Two-factor authentication required")
    except Exception as e:
        # ===================== GENERAL ERROR HANDLER =====================
        print("\n═════════ VERIFICATION FAILED ═════════")
        print(f"❌ ERROR: {str(e)}")
        print("✦ Action: Check parameters and network connection")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        # ===================== UNHANDLED ERROR HANDLER =====================
        print("\n═════════ CRITICAL ERROR ═════════")
        print(f"❌ UNHANDLED EXCEPTION: {str(e)}")
        sys.exit(1)
# ===================== END =====================