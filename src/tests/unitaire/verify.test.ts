import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
const { verifyJWT } = require('../../tests/unitaire/backfonction');

jest.mock('jsonwebtoken'); 

describe('verifyJWT', () => {
  
  const secret = 'mysecret';
  //1er test
  it('should log decoded data when the JWT is valid', () => {
    const mockDecoded = { userId: 1, username: 'testUser' };
    // On mock la fonction verify pour renvoyer un résultat "valide"
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, mockDecoded);
    });
    
    // Spy pour vérifier les logs
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    verifyJWT('validToken', secret);

    expect(consoleLogSpy).toHaveBeenCalledWith('JWT valide. Données décryptées :', mockDecoded);

    consoleLogSpy.mockRestore(); // Restaurer le spy
  });
  //2eme test
  it('should log "JWT Expired Error" when the JWT has expired', () => {
    const mockError = new TokenExpiredError('jwt expired', new Date());
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(mockError, null);
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    verifyJWT('expiredToken', secret);

    expect(consoleLogSpy).toHaveBeenCalledWith('JWT Expired Error:', mockError.message);
    expect(consoleLogSpy).toHaveBeenCalledWith('Le token a expiré à :', mockError.expiredAt);

    consoleLogSpy.mockRestore(); 
  });
//3eme test
  it('should log "JWT Error" when the JWT is invalid', () => {
    const mockError = new JsonWebTokenError('invalid token');
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(mockError, null);
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    verifyJWT('invalidToken', secret);

    expect(consoleLogSpy).toHaveBeenCalledWith('JWT Error:', mockError.message);

    consoleLogSpy.mockRestore(); 
  });
//4eme test
  it('should log "Unknown error" when the error is not a TokenExpiredError or JsonWebTokenError', () => {
    const mockError = new Error('Unknown error');
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(mockError, null);
    });

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    verifyJWT('unknownErrorToken', secret);

    expect(consoleLogSpy).toHaveBeenCalledWith('Erreur inconnue lors de la vérification du JWT:', mockError);

    consoleLogSpy.mockRestore(); 
  });

});
