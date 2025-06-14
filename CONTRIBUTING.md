# Contributing Guidelines

Thank you for your interest in contributing to the **Challenges Leaderboard** project! We welcome contributions that improve the codebase, add new features, or enhance the user experience. Please follow these guidelines to ensure a smooth collaboration process.

## Getting Started

1. **Clone the Repository**: Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/challenges-leaderboard.git
   ```
2. **Create a Branch**: Create a new branch for your changes:
   ```bash
   # replace feature-name your actual feature name
   git checkout -b feature/feature-name
   ```

## Code Quality and Consistency

This project uses several tools to maintain code quality and consistency. Please ensure your contributions adhere to the following standards:

### Tools in Use

1. **ESLint**: Ensures JavaScript code adheres to best practices and coding standards.
   - Run `npm run lint` to check for linting errors.
2. **Prettier**: Automatically formats code for consistency.
   - Prettier is integrated with lint-staged to format files before committing.
3. **Husky**: Manages Git hooks to enforce pre-commit checks.
   - Automatically runs linting and formatting checks before commits.
4. **Lint-Staged**: Ensures only staged files are linted and formatted.
   - Helps speed up the pre-commit process.
5. **Knip**: Detects unused files and exports in the codebase.
   - Run `npm run knip` to identify unused code.
6. **TypeScript**: Provides type safety and helps catch errors early.
   - Ensure your code adheres to TypeScript standards.

## Making Changes

1. **Write Clear Code**: Ensure your code is readable, well-documented, and adheres to the project's coding standards.
2. **Test Your Changes**: Verify that your changes work as expected and do not introduce new issues.
3. **Run Quality Checks**: Use the tools mentioned above to ensure your code meets quality standards.

## Submitting Your Contribution

1. **Commit Your Changes**: Write clear and concise commit messages:
   ```bash
   git commit -m "Add feature-name"
   ```
2. **Push Your Branch**: Push your branch to your forked repository:
   ```bash
   git push origin feature/feature-name
   ```
3. **Create a Pull Request**: Open a pull request to the main repository. Provide a detailed description of your changes and why they are necessary.

## Code Review Process

- Your pull request will be reviewed by the maintainers.
- Be prepared to make changes based on feedback.
- Once approved, your changes will be merged into the main branch.

## Reporting Issues

If you encounter bugs or have feature requests, please open an issue in the repository. Provide as much detail as possible to help us understand and address the problem.

## Contact

For questions or further assistance, feel free to reach out in [discussions](https://github.com/GKSS-UNISA/code-challenges-leaderboard/discussions).

Thank you for contributing to the **Challenges Leaderboard** project!
