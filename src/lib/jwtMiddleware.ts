import Koa from 'koa';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface UserIDJWTPayload extends jwt.JwtPayload {
        _id: string;
        username: string;
        exp: number;
}

const jwtMiddleware = async (ctx: Koa.Context, next: () => Promise<void>) => {
    const token = ctx.cookies.get('access_token');
    if(!token) return next();
    try {
        const decoded = <UserIDJWTPayload>jwt.verify(token, String(process.env.JWT_SECRET));
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user!.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }
        return next();
    } catch (e) {
        return next();
    }
};

export default jwtMiddleware;