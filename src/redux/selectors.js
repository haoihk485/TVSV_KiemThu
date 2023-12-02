// authSlice Selector
export const isLogeedInSelector = state => state.auth.isLoggedIn
export const errorAuthSelector = state => state.auth.error
export const authLoadingSelector = state => state.auth.isLoading
export const succesRegisterSelector = state => state.auth.successRegister
export const userSelector = state => state.auth.user

//adminDepartmentSlice Selector
export const AdminDepMessage = state => state.adminDepartment.message
export const AdminDepLoadingSelector = state => state.adminDepartment.isLoading
export const DepartmentListSelector = state => state.adminDepartment.DepartmentList
export const DepListTotalPageSelector = state => state.adminDepartment.totalPage
export const DepartmentSelector = state => state.adminDepartment.Department
export const GetDepNameList = state => state.adminDepartment.DepartmentNameList
export const DepartmentDetail = state => state.adminDepartment.DepUserList
export const ModalTotalPage = state => state.adminDepartment.ModalTotalPage

//adminFieldSlice Selector
export const AdminFieldMessage = state => state.adminField.message
export const AdminFieldLoadingSelector = state => state.adminField.isLoading
export const FieldListSelector = state => state.adminField.fieldList
export const FieldListPageSelector = state => state.adminField.page
export const FieldListTotalPageSelector = state => state.adminField.totalPage

//adminUserSlice Selector
export const AdminUserMessage = state => state.adminUser.message
export const AdminUserLoadingSelector = state => state.adminUser.isLoading
export const UserListPageSelector = state => state.adminUser.page
export const UserListTotalPageSelector = state => state.adminUser.totalPage
export const UserListSelector = state => state.adminUser.userList
export const UserDepIsNullList = state => state.adminUser.userDepIsNullList
export const UserDepIsNullTotalPage = state => state.adminUser.userDepIsNullTotalPage

//depHeadUser Selector
export const DHUserList = state => state.depHeadUser.userList
export const DHUserMessage = state => state.depHeadUser.message
export const DHUserIsLoading = state => state.depHeadUser.isLoading
export const DHUserTotalPage = state => state.depHeadUser.totalPage
export const DHUserFieldUserDontHave = state => state.depHeadUser.fieldUserDontHave
export const DHUserDetail = state => state.depHeadUser.user

//depHeadFields Selector
export const DHFieldList = state => state.depHeadField.fieldList
export const DHFieldMessage = state => state.depHeadField.message
export const DHFieldIsLoading = state => state.depHeadField.isLoading
export const DHFieldTotalPage = state => state.depHeadField.totalPage
export const DHFieldListDepNotHave = state => state.depHeadField.fieldListDepNotHave

//user Selector 
export const userDepList = state => state.user.depList
export const userTopicList = state => state.user.topicList
export const userIsLoading = state => state.user.isLoading
export const userTotalPage = state => state.user.totalPage 
export const userFieldList = state =>state.user.fieldList



