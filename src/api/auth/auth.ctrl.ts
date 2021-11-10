import Koa from 'koa';
import Joi from 'joi';
import User from '../../models/user';

export const register = async (ctx: Koa.Context) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { username, password } = ctx.request.body;
  try {
    // username  이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      httpOnly: true,
    });

  } catch (e) {
    console.log(e);
  }
};

export const login = async (ctx: Koa.Context) => {
  const { username, password } = ctx.request.body;

  if(!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if(!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if(!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      httpOnly: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const check = async (ctx: Koa.Context) => {
  const { user } = ctx.state;
  console.log('checking');
  if (!user) {
    ctx.status = 401; //Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async (ctx: Koa.Context) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
