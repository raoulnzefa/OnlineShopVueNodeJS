
export default function auth({next}) {
 
  const loggedIn = localStorage.getItem('user');
  if (!loggedIn) {
    return next('/login');
  }
  next();
}