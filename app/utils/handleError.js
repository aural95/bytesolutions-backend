const handleHttpError = (res, message = 'something went wrong', code =403)=>{
    res.status(code);
    res.send({error:message});
}

module.exports={handleHttpError}