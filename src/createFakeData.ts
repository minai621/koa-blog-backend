import Post from './models/post';
import posts from './api';
import { log } from 'util';

export default function createFakeData() {

  const posts = [...Array(40).keys()].map(i => ({
    title: `포스트 #${i}`,
    body: 'I do the same thing I told you that I never would\n' +
      'I told you I\'d change, even when I knew I never could\n' +
      'Know that I can\'t find nobody else as good as you\n' +
      'I need you to stay, need you to stay, hey (oh)\n' +
      'I get drunk, wake up, I\'m wasted still\n' +
      'I realize the time that I wasted here\n' +
      'I feel like you can\'t feel the way I feel\n' +
      'Oh, I\'ll be fucked up if you can\'t be right here\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'Oh, I\'ll be fucked up if you can\'t be right here\n' +
      'I do the same thing I told you that I never would\n' +
      'I told you I\'d change, even when I knew I never could\n' +
      'Know that I can\'t find nobody else as good as you\n' +
      'I need you to stay, need you to stay, hey\n' +
      'I do the same thing I told you that I never would\n' +
      'I told you I\'d change even when I knew I never could\n' +
      'Know that I can\'t find nobody else as good as you\n' +
      'I need you to stay, need you to stay, hey\n' +
      'When I\'m away from you, I miss your touch (ooh-ooh)\n' +
      'You\'re the reason I believe in love\n' +
      'It\'s been difficult for me to trust (ooh-ooh)\n' +
      'And I\'m afraid that I\'ma fuck it up\n' +
      'Ain\'t no way that I can leave you stranded\n' +
      '\'Cause you ain\'t ever left me empty-handed\n' +
      'And you know that I know that I can\'t live without you\n' +
      'So, baby, stay\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'Oh-oh-oh-whoa (oh-oh-whoa, oh-oh-whoa)\n' +
      'I\'ll be fucked up if you can\'t be right here\n' +
      'I do the same thing I told you that I never would\n' +
      'I told you I\'d change, even when I knew I never could\n' +
      'Know that I can\'t find nobody else as good as you\n' +
      'I need you to stay, need you to stay, hey\n' +
      'I do the same thing I told you that I never would\n' +
      'I told you I\'d change even when I knew I never could\n' +
      'Know that I can\'t find nobody else as good as you\n' +
      'I need you to stay, need you to stay, hey\n' +
      'Oh-oh-oh\n' +
      'I need you to stay, need you to stay, hey',
    tags: ['가짜', '데이타'],
    }));
  Post.insertMany(posts);
}