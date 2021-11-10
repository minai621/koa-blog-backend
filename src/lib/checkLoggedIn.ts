import Koa from 'koa';
const checkLoggedIn = (ctx: Koa.Context, next: () => Promise<void>) => {
    if (!ctx.state.user) {
        ctx.status = 401;
        return;
    }
    return next();
}

export default checkLoggedIn;