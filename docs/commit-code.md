# How to Commit Code

## Pre-Commit Hooks

pre-commit hooks run the following checks before your code is committed:

1. **Linting:** Ensures your code follows our style guidelines
2. **Testing:** Runs affected tests to catch any regressions
3. **Type Checking:** Validates TypeScript types

If any of these checks fail, the commit will be aborted, and you'll need to fix the issues before trying again.

**Important:** DO NOT STOP HUSKY UNTIL IT'S FINISHED

### Handling Pre-Commit Hook Failures

If your commit fails due to linting, testing, or type checking issues:

1. **Read the error messages** to understand what failed
2. **Fix the issues** in your code
3. **Stage the changes** again with `git add`
4. **Try committing again**
