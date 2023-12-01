export const trimEmailToken = async (req, res, next) => {
    // Check if the response body contains the property 'emailToken'
    if (res.locals && res.locals.updatedUser && res.locals.updatedUser.emailToken) {
      // Trim 'emailToken' from the response body
      res.locals.updatedUser = {
        ...res.locals.updatedUser,
        emailToken: undefined,
      };
    }
    // Proceed to the next middleware or route handler
    next();
  };
  