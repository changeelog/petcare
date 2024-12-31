import { SignIn as ClerkSignIn } from '@clerk/nextjs';


function SignIn () {
return (
  <ClerkSignIn
    appearance={{
      elements: {
        header: 'hidden',
      },
    }}
  />
)
};

export { SignIn }
