
// automatic finction call 
// (function(){
//     console.log("Hey");
// })();

// app.post('/login', async (req, res) => {
//   try {
//     const data = req.body
//     console.log(data)
//     const login = new Login(data)
//     const respons = await login.save()
//     res.status(200).json({
//       success: true,
//       mag: 'OTP send Succeefully',
//       data: {
//         mobileNo: respons
//       }
//     })
//   } catch (error) {
//     res.json({
//       success: false,
//       mag: 'OTP could not send',
//       error: error
//     })
//   }
// });

// app.get('/login', async (req, res) => {
//   try {
//     const data = await Login.find()
//     res.status(200).json({
//       success: true,
//       data: data
//     })
//   } catch (error) {
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// })

// app.get('/user/:mobileNo', async (req, res) => {
//   try {
//     const mobile = req.params.mobileNo
//     console.log(mobile);
//     // console.log(Login.find({ mobileNo: mobile }));
//       const respons =await Login.find({ mobileNo: mobile });
//       res.status(200).json({
//         success: true,
//         data: respons
//       })
    
//   } catch (error) {
//     res.json({
//       success: false,
//       error: error
//     })
//   }
// });
// 