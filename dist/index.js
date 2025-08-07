"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = __importDefault(require("dotenv"));
var child_process_1 = require("child_process");
var ed25519 = __importStar(require("@noble/ed25519"));
var sha256_1 = require("@noble/hashes/sha256");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function signForContract(tonAddress) {
            return __awaiter(this, void 0, void 0, function () {
                var timestamp, message, hash, signature;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timestamp = Date.now();
                            message = "".concat(tonAddress, ":").concat(timestamp);
                            hash = (0, sha256_1.sha256)(message);
                            return [4 /*yield*/, ed25519.sign(hash, CONFIG.ORACLE_PRIVATE_KEY)];
                        case 1:
                            signature = _a.sent();
                            return [2 /*return*/, Buffer.from(signature).toString('hex')];
                    }
                });
            });
        }
        function verifyTwitterFollow(twitterHandle) {
            return __awaiter(this, void 0, void 0, function () {
                var userResponse, userId, nextToken, isFollowing, params, followingResponse, error_1;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/by/username/".concat(twitterHandle), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) }
                                })];
                        case 1:
                            userResponse = _d.sent();
                            userId = (_a = userResponse.data.data) === null || _a === void 0 ? void 0 : _a.id;
                            if (!userId)
                                return [2 /*return*/, false];
                            nextToken = void 0;
                            isFollowing = false;
                            _d.label = 2;
                        case 2:
                            params = {
                                max_results: 1000,
                                "user.fields": "username"
                            };
                            if (nextToken)
                                params.pagination_token = nextToken;
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/".concat(userId, "/following"), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) },
                                    params: params
                                })];
                        case 3:
                            followingResponse = _d.sent();
                            isFollowing = (_b = followingResponse.data.data) === null || _b === void 0 ? void 0 : _b.some(function (user) { return user.username === CONFIG.GOTHAM_TWITTER_ID; });
                            nextToken = (_c = followingResponse.data.meta) === null || _c === void 0 ? void 0 : _c.next_token;
                            _d.label = 4;
                        case 4:
                            if (nextToken && !isFollowing) return [3 /*break*/, 2];
                            _d.label = 5;
                        case 5: return [2 /*return*/, isFollowing];
                        case 6:
                            error_1 = _d.sent();
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        function verifyTwitterRetweet(twitterHandle, tweetId) {
            return __awaiter(this, void 0, void 0, function () {
                var userResponse, userId, nextToken, hasRetweeted, params, tweetsResponse, error_2;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/by/username/".concat(twitterHandle), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) }
                                })];
                        case 1:
                            userResponse = _d.sent();
                            userId = (_a = userResponse.data.data) === null || _a === void 0 ? void 0 : _a.id;
                            if (!userId)
                                return [2 /*return*/, false];
                            nextToken = void 0;
                            hasRetweeted = false;
                            _d.label = 2;
                        case 2:
                            params = {
                                max_results: 100,
                                expansions: "referenced_tweets.id",
                                "tweet.fields": "referenced_tweets"
                            };
                            if (nextToken)
                                params.pagination_token = nextToken;
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/".concat(userId, "/tweets"), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) },
                                    params: params
                                })];
                        case 3:
                            tweetsResponse = _d.sent();
                            hasRetweeted = (_b = tweetsResponse.data.data) === null || _b === void 0 ? void 0 : _b.some(function (tweet) {
                                var _a;
                                return (_a = tweet.referenced_tweets) === null || _a === void 0 ? void 0 : _a.some(function (ref) { return ref.type === "retweeted" && ref.id === tweetId; });
                            });
                            nextToken = (_c = tweetsResponse.data.meta) === null || _c === void 0 ? void 0 : _c.next_token;
                            _d.label = 4;
                        case 4:
                            if (nextToken && !hasRetweeted) return [3 /*break*/, 2];
                            _d.label = 5;
                        case 5: return [2 /*return*/, hasRetweeted];
                        case 6:
                            error_2 = _d.sent();
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        function verifyTwitterLike(twitterHandle, tweetId) {
            return __awaiter(this, void 0, void 0, function () {
                var userResponse, userId, nextToken, hasLiked, params, likesResponse, error_3;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/by/username/".concat(twitterHandle), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) }
                                })];
                        case 1:
                            userResponse = _d.sent();
                            userId = (_a = userResponse.data.data) === null || _a === void 0 ? void 0 : _a.id;
                            if (!userId)
                                return [2 /*return*/, false];
                            nextToken = void 0;
                            hasLiked = false;
                            _d.label = 2;
                        case 2:
                            params = {
                                max_results: 100,
                                "tweet.fields": "id"
                            };
                            if (nextToken)
                                params.pagination_token = nextToken;
                            return [4 /*yield*/, axios_1.default.get("https://api.twitter.com/2/users/".concat(userId, "/liked_tweets"), {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) },
                                    params: params
                                })];
                        case 3:
                            likesResponse = _d.sent();
                            hasLiked = (_b = likesResponse.data.data) === null || _b === void 0 ? void 0 : _b.some(function (tweet) { return tweet.id === tweetId; });
                            nextToken = (_c = likesResponse.data.meta) === null || _c === void 0 ? void 0 : _c.next_token;
                            _d.label = 4;
                        case 4:
                            if (nextToken && !hasLiked) return [3 /*break*/, 2];
                            _d.label = 5;
                        case 5: return [2 /*return*/, hasLiked];
                        case 6:
                            error_3 = _d.sent();
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        var REQUIRED_ENV, missingEnv, CONFIG, app, PORT, verificationCodes, socialConnections;
        var _this = this;
        return __generator(this, function (_a) {
            console.log('🚀 Starting Social Verifier service...');
            dotenv_1.default.config();
            REQUIRED_ENV = [
                'TWITTER_BEARER_TOKEN',
                'TELEGRAM_API_ID',
                'TELEGRAM_API_HASH',
                'ORACLE_PRIVATE_KEY',
                'GOTHAM_TWITTER_ID',
                'GOTHAM_TELEGRAM_CHANNEL'
            ];
            missingEnv = REQUIRED_ENV.filter(function (env) { return !process.env[env]; });
            if (missingEnv.length > 0) {
                console.error('❌ Missing required environment variables:', missingEnv);
                process.exit(1);
            }
            CONFIG = {
                TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
                TELEGRAM_API_ID: parseInt(process.env.TELEGRAM_API_ID),
                TELEGRAM_API_HASH: process.env.TELEGRAM_API_HASH,
                ORACLE_PRIVATE_KEY: process.env.ORACLE_PRIVATE_KEY,
                GOTHAM_TWITTER_ID: process.env.GOTHAM_TWITTER_ID.replace('@', ''),
                GOTHAM_TELEGRAM_CHANNEL: process.env.GOTHAM_TELEGRAM_CHANNEL,
                XP_AMOUNT: parseInt(process.env.XP_AMOUNT || '50'),
                VERIFICATION_TIMEOUT: parseInt(process.env.VERIFICATION_TIMEOUT || '300000'),
            };
            console.log('✅ Configuration loaded');
            app = (0, express_1.default)();
            app.use(express_1.default.json());
            PORT = process.env.PORT || 3000;
            verificationCodes = new Map();
            socialConnections = new Map();
            app.post('/generate-code', function (req, res) {
                var tonAddress = req.body.tonAddress;
                if (!tonAddress)
                    return res.status(400).json({ error: 'TON address required' });
                var code = Array.from({ length: 8 }, function () {
                    return Math.random().toString(36).charAt(2).toUpperCase();
                }).join('');
                var expires = Date.now() + CONFIG.VERIFICATION_TIMEOUT;
                verificationCodes.set(tonAddress, { code: code, expires: expires });
                setTimeout(function () {
                    var record = verificationCodes.get(tonAddress);
                    if (record && record.expires <= Date.now()) {
                        verificationCodes.delete(tonAddress);
                    }
                }, CONFIG.VERIFICATION_TIMEOUT);
                res.json({ code: code, expiresIn: CONFIG.VERIFICATION_TIMEOUT / 1000 });
            });
            app.post('/verify/twitter', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, tonAddress, twitterHandle, storedCode, response, currentData, error_4;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = req.body, tonAddress = _a.tonAddress, twitterHandle = _a.twitterHandle;
                            storedCode = verificationCodes.get(tonAddress);
                            if (!storedCode || storedCode.expires < Date.now()) {
                                return [2 /*return*/, res.status(400).json({ error: 'Invalid or expired code' })];
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.get('https://api.twitter.com/2/tweets/search/recent', {
                                    headers: { Authorization: "Bearer ".concat(CONFIG.TWITTER_BEARER_TOKEN) },
                                    params: {
                                        query: "from:".concat(twitterHandle, " ").concat(storedCode.code),
                                        max_results: 10,
                                        "tweet.fields": "text"
                                    }
                                })];
                        case 2:
                            response = _d.sent();
                            if (!((_b = response.data.meta) === null || _b === void 0 ? void 0 : _b.result_count) || response.data.meta.result_count === 0) {
                                return [2 /*return*/, res.status(400).json({ error: 'Verification code not found in tweets' })];
                            }
                            currentData = socialConnections.get(tonAddress) || {};
                            socialConnections.set(tonAddress, __assign(__assign({}, currentData), { twitterHandle: twitterHandle }));
                            verificationCodes.delete(tonAddress);
                            res.json({ status: 'verified', twitterHandle: twitterHandle });
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _d.sent();
                            // Упрощенная обработка ошибок без AxiosError
                            res.status(500).json({
                                error: 'Verification failed',
                                details: ((_c = error_4.response) === null || _c === void 0 ? void 0 : _c.data) || error_4.message
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post('/verify/telegram', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, tonAddress, phoneNumber, storedCode, pythonProcess, output_1;
                return __generator(this, function (_b) {
                    _a = req.body, tonAddress = _a.tonAddress, phoneNumber = _a.phoneNumber;
                    storedCode = verificationCodes.get(tonAddress);
                    if (!storedCode || storedCode.expires < Date.now()) {
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid or expired code' })];
                    }
                    try {
                        pythonProcess = (0, child_process_1.spawn)('python3', [
                            './telegram_verifier.py',
                            phoneNumber,
                            storedCode.code,
                            CONFIG.TELEGRAM_API_ID.toString(),
                            CONFIG.TELEGRAM_API_HASH
                        ]);
                        output_1 = '';
                        pythonProcess.stdout.on('data', function (data) { return output_1 += data.toString(); });
                        pythonProcess.on('close', function (code) {
                            if (code !== 0) {
                                return res.status(500).json({ error: 'Verification script failed', output: output_1 });
                            }
                            if (output_1.includes('VERIFIED')) {
                                var currentData = socialConnections.get(tonAddress) || {};
                                socialConnections.set(tonAddress, __assign(__assign({}, currentData), { telegramId: phoneNumber }));
                                verificationCodes.delete(tonAddress);
                                res.json({ status: 'verified', phoneNumber: phoneNumber });
                            }
                            else {
                                res.status(400).json({ error: 'Verification code not found in bio', output: output_1 });
                            }
                        });
                    }
                    catch (error) {
                        res.status(500).json({ error: 'Verification failed', details: error.message });
                    }
                    return [2 /*return*/];
                });
            }); });
            app.post('/verify/twitter-action', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, tonAddress, action, tweetId, connection, isValid, _b, signature, error_5;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = req.body, tonAddress = _a.tonAddress, action = _a.action, tweetId = _a.tweetId;
                            connection = socialConnections.get(tonAddress);
                            if (!(connection === null || connection === void 0 ? void 0 : connection.twitterHandle)) {
                                return [2 /*return*/, res.status(400).json({ error: 'Twitter account not linked' })];
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 11, , 12]);
                            isValid = false;
                            _b = action;
                            switch (_b) {
                                case 'follow': return [3 /*break*/, 2];
                                case 'retweet': return [3 /*break*/, 4];
                                case 'like': return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 8];
                        case 2: return [4 /*yield*/, verifyTwitterFollow(connection.twitterHandle)];
                        case 3:
                            isValid = _d.sent();
                            return [3 /*break*/, 9];
                        case 4:
                            if (!tweetId)
                                return [2 /*return*/, res.status(400).json({ error: 'Tweet ID required for retweet verification' })];
                            return [4 /*yield*/, verifyTwitterRetweet(connection.twitterHandle, tweetId)];
                        case 5:
                            isValid = _d.sent();
                            return [3 /*break*/, 9];
                        case 6:
                            if (!tweetId)
                                return [2 /*return*/, res.status(400).json({ error: 'Tweet ID required for like verification' })];
                            return [4 /*yield*/, verifyTwitterLike(connection.twitterHandle, tweetId)];
                        case 7:
                            isValid = _d.sent();
                            return [3 /*break*/, 9];
                        case 8: return [2 /*return*/, res.status(400).json({ error: 'Invalid action type' })];
                        case 9:
                            if (!isValid) {
                                return [2 /*return*/, res.status(400).json({ error: 'Action not verified' })];
                            }
                            return [4 /*yield*/, signForContract(tonAddress)];
                        case 10:
                            signature = _d.sent();
                            res.json({
                                xpAmount: CONFIG.XP_AMOUNT,
                                signature: signature,
                                message: "".concat(action, " verified successfully")
                            });
                            return [3 /*break*/, 12];
                        case 11:
                            error_5 = _d.sent();
                            // Упрощенная обработка ошибок без AxiosError
                            res.status(500).json({
                                error: 'Verification failed',
                                details: ((_c = error_5.response) === null || _c === void 0 ? void 0 : _c.data) || error_5.message
                            });
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            }); });
            app.post('/verify/telegram-action', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, tonAddress, action, connection, pythonProcess, output_2;
                return __generator(this, function (_b) {
                    _a = req.body, tonAddress = _a.tonAddress, action = _a.action;
                    connection = socialConnections.get(tonAddress);
                    if (!(connection === null || connection === void 0 ? void 0 : connection.telegramId)) {
                        return [2 /*return*/, res.status(400).json({ error: 'Telegram account not linked' })];
                    }
                    try {
                        pythonProcess = (0, child_process_1.spawn)('python3', [
                            './telegram_action_verifier.py',
                            connection.telegramId,
                            CONFIG.GOTHAM_TELEGRAM_CHANNEL,
                            action,
                            CONFIG.TELEGRAM_API_ID.toString(),
                            CONFIG.TELEGRAM_API_HASH
                        ]);
                        output_2 = '';
                        pythonProcess.stdout.on('data', function (data) { return output_2 += data.toString(); });
                        pythonProcess.on('close', function (code) {
                            if (code !== 0) {
                                return res.status(500).json({ error: 'Verification script failed', output: output_2 });
                            }
                            if (output_2.includes('VERIFIED')) {
                                signForContract(tonAddress).then(function (signature) {
                                    res.json({
                                        xpAmount: CONFIG.XP_AMOUNT,
                                        signature: signature,
                                        message: "".concat(action, " verified successfully")
                                    });
                                });
                            }
                            else {
                                res.status(400).json({ error: 'Action not verified', output: output_2 });
                            }
                        });
                    }
                    catch (error) {
                        res.status(500).json({ error: 'Verification failed', details: error.message });
                    }
                    return [2 /*return*/];
                });
            }); });
            app.listen(PORT, function () {
                console.log("\n\u26A1\uFE0F Server is running on http://localhost:".concat(PORT));
                console.log('🚀 Ready to verify social actions!');
            });
            return [2 /*return*/];
        });
    });
}
main().catch(function (error) {
    console.error('🔥 Critical startup error:', error);
    process.exit(1);
});
