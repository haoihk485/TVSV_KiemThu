//     Hàm 1
	private ResponseEntity<?> handleRegister(UserPayload request) {
        var error = userUtility.validationNewUser(request, false);
        if (error != null) {
            return new ResponseEntity<>(new MessageResponse(false, error.getMessage()), error.getStatus());
        }
        var role = roleService.findByName(RoleName.ROLE_USER);
        var user = new User(
                request.getName(),
                request.getEmail().toLowerCase(),
                request.getPhone(),
                passwordEncoder.encode(request.getPassword()),
                true,
                role);
        user.setOccupation(request.getOccupation());
        userService.save(user);
        return new ResponseEntity<>(
                new MessageResponse(true, "Tạo tài khoản thành công"),
                HttpStatus.CREATED);
        }


    
	
	// Hàm 2
	private ResponseEntity<?> handleLogout(HttpServletRequest request) {
        var tokenValue = tokenUtility.getRefreshTokenByValue(request);
        if (StringUtils.hasText(tokenValue)) {
            var tokenAuth = refreshTokenService.findById(tokenValue);
            var parent = tokenAuth.getParent() != null ? tokenAuth.getParent() : tokenAuth;
            refreshTokenService.deleteById(parent.getToken());
        }
        var response = tokenUtility.clearCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, response.toString())
                .body(new MessageResponse(true, "Đăng xuất thành công"));
    }
	
	// Hàm 3
	private ResponseEntity<?> handleLogin(LoginRequest request) {
        var authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var userDetails = (UserDetailsImpl) authentication.getPrincipal();
        var authority = userDetails.getAuthorities().stream().findFirst();

        if (authority.isEmpty()) {
            return new ResponseEntity<>(
                    new MessageResponse(false, "Không đủ quyền truy cập"),
                    HttpStatus.UNAUTHORIZED);
        }

        var token = tokenUtility.generateToken(userDetails.getUsername());
        var refreshToken = tokenUtility.generateRefreshToken();
        var user = userService.findById(userDetails.getId());
        refreshToken.setUser(user);
        var savedToken = refreshTokenService.save(refreshToken);
        var cookie = tokenUtility.setCookie(savedToken.getToken());
        var response = new AuthModel(
                token,
                user.getName(),
                authority.get().getAuthority(),
                user.getAvatar());
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new ApiResponse<>(true, response));
    }
	
	// Hàm 4
	private ResponseEntity<?> handleGetDepartments(String value, int page, int size, String[] sort, String status) {
        var orders = sortUtility.sortOrders(sort);
        var pageable = PageRequest.of(page, size, Sort.by(orders));
        var departmentPage = switch (status) {
            case "active" -> (value == null)
                    ? departmentService.findAllByStatusIsTrue(pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndStatusIsTrue(value, pageable);
            case "inactive" -> (value == null)
                    ? departmentService.findAllByStatusIsFalse(pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndStatusIsFalse(value, pageable);
            default -> (value == null)
                    ? departmentService.findAll(pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(value, pageable);
        };

        var departments = departmentPage.getContent().stream().map(department ->
                DepartmentPayload.builder()
                        .id(department.getId())
                        .name(department.getName())
                        .description(department.getDescription())
                        .status(department.getStatus())
                        .build()
        ).toList();
        var response =
                new PaginationModel<>(
                        departments,
                        departmentPage.getNumber(),
                        departmentPage.getTotalPages()
                );
        return ResponseEntity.ok(new ApiResponse<>(true, response));
    }
	
	// Hàm 5
	private ResponseEntity<?> handleGetFields(String value, int page, int size, String[] sort) {
        var orders = sortUtility.sortOrders(sort);
        var pageable = PageRequest.of(page, size, Sort.by(orders));
        var fieldPage = (value == null)
                ? fieldService.findAll(pageable)
                : fieldService.findByNameContaining(value, pageable);
        var fields = fieldPage.getContent();
        var response =
                new PaginationModel<>(
                        fields,
                        fieldPage.getNumber(),
                        fieldPage.getTotalPages()
                );
        return ResponseEntity.ok(new ApiResponse<>(true, response));
    }

	// Hàm 6
	private ResponseEntity<?> handleCreateField(FieldPayload request) {
        var error = validationCreateField(request);
        if (error != null) {
            return new ResponseEntity<>(new MessageResponse(false, error.getMessage()), error.getStatus());
        }
        var fields = new Field(
                request.getName()
        );
        fieldService.save(fields);
        return new ResponseEntity<>(
                new MessageResponse(true, "Thêm lĩnh vực thành công"),
                HttpStatus.CREATED);
        }