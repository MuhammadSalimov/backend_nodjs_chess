module.exports = class UserDto{
  email
  id 
  isActivated
  role
  constructor(model){
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.role = model.role
  }
}