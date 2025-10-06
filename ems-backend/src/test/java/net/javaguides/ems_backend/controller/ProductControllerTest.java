package net.javaguides.ems_backend.controller;
import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductDto productDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        productDto = new ProductDto();
        productDto.setId(1L);
        productDto.setProductName("Laptop");
    }

    @Test
    void testCreateProduct() {
        when(productService.createProduct(any(ProductDto.class))).thenReturn(productDto);

        ResponseEntity<ProductDto> response = productController.createProduct(productDto);

        assertThat(response.getBody().getProductName()).isEqualTo("Laptop");
        assertThat(response.getStatusCodeValue()).isEqualTo(201);
    }

    @Test
    void testGetProductById() {
        when(productService.getProductById(1L)).thenReturn(productDto);

        ResponseEntity<ProductDto> response = productController.getProductById(1L);

        assertThat(response.getBody().getProductName()).isEqualTo("Laptop");
        verify(productService).getProductById(1L);
    }

    @Test
    void testGetAppProducts() {
        when(productService.getAllProducts()).thenReturn(Arrays.asList(productDto));

        ResponseEntity<List<ProductDto>> response = productController.getAppProducts();

        assertThat(response.getBody()).hasSize(1);
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productService).deleteProduct(1L);

        ResponseEntity<String> response = productController.deleteProduct(1L);

        assertThat(response.getBody()).contains("deleted successfully");
    }
}
