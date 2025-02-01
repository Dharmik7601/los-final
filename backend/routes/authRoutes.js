const express = require('express');
const router = express.Router();
const { createUser, getAllUser, login, getUser, deleteUser, updateUser, getAdmin, blockUser, unblockUser, handleRefreshToken, logout, passwordReset, forgetPasswordToken, resetPassword, updateUserLoanDetails, checkOtp, setUserPassword, checkLoginOtp,getUser1, checkisBankAccountLinked, checkIfAvailable, getBankDetails, checkAuth, getLoanInquiryDetails, getUserDocumentDetails, getUserLoanDocumentLink, getUserLoanSanctionLetterDetails } = require('../Controller/userController');
const { authMiddleware, isAdmin } = require('../Middleware/AuthMiddleware')

router.get('/check-auth',authMiddleware,checkAuth)
router.post('/signup', createUser)
router.post('/check-otp',checkOtp);
router.put('/set-password',authMiddleware,setUserPassword)
router.get('/getAllUser', getAllUser)
router.route('/login').post(login)
router.post('/check-login-otp', checkLoginOtp)
router.get('/getUser', authMiddleware, getUser);
router.route('/admin').get(getAdmin)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.post('/forget-password-token', forgetPasswordToken)
// router.put('/reset-password/:token',authMiddleware,resetPassword)
router.put('/reset-password/:token', resetPassword)

router.get('/getUser1', authMiddleware,getUser1);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/update-user',authMiddleware, updateUser);
router.get('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.get('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)
router.put('/password', authMiddleware, passwordReset)
router.get('/cibal', authMiddleware, checkisBankAccountLinked)
router.post('/cia', checkIfAvailable)
router.get('/get-bank-details', authMiddleware, getBankDetails)
router.get('/loan/inquiry/:loanId', authMiddleware, getLoanInquiryDetails)
router.get('/documents/getAll', authMiddleware, getUserDocumentDetails)
router.get('/document/link/:doc', authMiddleware, getUserLoanDocumentLink)
router.get('/loan/sanction/letter/:loanId',authMiddleware,getUserLoanSanctionLetterDetails)



module.exports = router;