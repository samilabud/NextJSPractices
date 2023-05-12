import { render, screen, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MyForm from '../pages/myform';
import '@testing-library/jest-dom';
import axios from 'axios';
 
jest.mock('axios');

describe('MyForm', () => {
  it('renders a heading', () => {
    render(<MyForm />);
 
    const heading = screen.getByRole('heading', {
      name: /form with javascript/i,
    });
 
    expect(heading).toBeInTheDocument();
  });

  it('submit form successfully', async () => {
    const firstName = 'Samil';
    const lastName = 'Abud';
    axios.post.mockImplementation((url) => {
      switch (url) {
        case '/api/form':
          return Promise.resolve({ status: 200, data: {data: `${firstName} ${lastName}`} });
      }
    });

    render(<MyForm />);

    const inputFirstName = screen.getByTestId('inputFirstName');
    const inputLastName = screen.getByTestId('inputLastName');

    await userEvent.type(inputFirstName, firstName);
    await userEvent.type(inputLastName, lastName);
 
    await act(async () => {
      const submitBtn = screen.getByRole('button', {
        name: /submit/i,
      });
      userEvent.click(submitBtn);
    });

    await waitFor(() => expect(screen.queryByText("This is your full name from API: Samil Abud")).toBeInTheDocument());

  });
});