import { SignUp as ClerkSignUp } from '@clerk/nextjs';

function SignUp() {
  return (
    <ClerkSignUp
      appearance={{
        elements: {
          header: 'hidden',
        },
      }}
    />
  );
}

export { SignUp }
