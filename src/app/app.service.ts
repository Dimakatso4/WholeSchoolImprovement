import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor() { }


  

 /* getLoggedInUserRole() {
    return localStorage.getItem("Roles");
   
  getLoggedInUserRole() {
    return localStorage.getItem("rolename");
  }

  setLoggedInUserRole(value) {
    localStorage.setItem("rolename", value);
  }
  */

  getLoggedInEmisCode() {
    return localStorage.getItem("emisCode");
  }

  setLoggedInEmisCode(value) {
    localStorage.setItem("emisCode", value);
  }

  getLoggedInDistrictCode() {
    return localStorage.getItem("districtCode");
  }

  setLoggedInDistrictCode(value) {
    localStorage.setItem("districtCode", value);
  }

  getLoggedInUserId() {
    return localStorage.getItem("userId");
  }

  setLoggedInUserId(value) {
    localStorage.setItem("userId", value);
  }

  getIsLoggedInUser() {

    if (localStorage.getItem("isLoggedIn"))
      return true;
    else {
      localStorage.setItem("isLoggedIn", "false");
      return false;
    }

    //return localStorage.getItem("isLoggedIn");
  }

  setIsLoggedInUser(value) {
    localStorage.setItem("isLoggedIn", value);
  }

  getIsLoggedInUsername() {
    return localStorage.getItem("username");
  }

  setIsLoggedInUsername(value) {
    localStorage.setItem("username", value);
  }
  getIsLoggedInRoleID() {
    return localStorage.getItem("roleId");
  }
  setIsLoggedInRoleID(value) {
    localStorage.setItem("roleId", value);
  }

  
  getIsLoggedInRoleName() {
    return localStorage.getItem("rolename");
  }
  setIsLoggedInRoleName(value) {
    localStorage.setItem("rolename", value);
  }


  getLoggedInParentId() {
    return localStorage.getItem("parentId");
  }

  setLoggedInParentId(value) {
    localStorage.setItem("parentId", value);
  }

  getUserHasMultipeRoles() {
    return localStorage.getItem("MultipleRoles");
  }

  setUserHasMultipeRoles(value) {
    localStorage.setItem("MultipleRoles", value);
  }
  getLoggedInUserRole() {
    return localStorage.getItem("rolename");
  }

  setLoggedInUserRole(value) {
    localStorage.setItem("rolename", value);
  }
  
  getLoggedInUserOfficeLevel() {
    return localStorage.getItem("officeLevel");
  }

  setLoggedInUserOfficeLevel(value) {
    localStorage.setItem("officeLevel", value);
  }
    
  getLoggedInUserDirectorate() {
    return localStorage.getItem("directorate");
  }

  setLoggedInUserDirectorate(value) {
    localStorage.setItem("directorate", value);
  }

}
