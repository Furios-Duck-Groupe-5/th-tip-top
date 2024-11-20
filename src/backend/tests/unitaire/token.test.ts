import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../../backfonction';

jest.mock('jsonwebtoken'); 

describe('generateAccessToken', () => {
  it('should generate a valid JWT token', () => {
    const user = { id: 1, role: 'admin' };
    const token = 'mockedToken';
    
    (jwt.sign as jest.Mock).mockReturnValue(token);  

    const result = generateAccessToken(user);

    expect(result).toBe(token);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, role: 'admin' },
      expect.any(String), 
      { expiresIn: '1d' }
    );
  });
});
