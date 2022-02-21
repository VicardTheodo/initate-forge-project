import { axe } from 'jest-axe';
import { render } from '../../../../services/testing/reactTestingLibraryWrapper';
import { Home } from '../Home';

test('AAU, I can see the home page without basic accessibility issues', async () => {
  const { container } = render(<Home />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
