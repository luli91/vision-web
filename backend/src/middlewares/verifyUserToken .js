const admin = require('firebase-admin');
const serviceAccount = require('../../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    req.params.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = { verifyUserToken };

