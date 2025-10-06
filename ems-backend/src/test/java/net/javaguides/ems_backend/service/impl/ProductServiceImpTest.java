package net.javaguides.ems_backend.service.impl;

import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.entity.Product;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ProductServiceImpTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImp productService;

    private Product product;
    private ProductDto productDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        product = new Product(1L, "Laptop", "Electronics", 2500.0f);
        productDto = new ProductDto(1L, 2500.0f, "Laptop", "Electronics");
    }

    @Test
    void testCreateProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.createProduct(productDto);

        assertThat(result.getProductName()).isEqualTo("Laptop");
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testGetProductByIdFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductDto result = productService.getProductById(1L);

        assertThat(result.getProductName()).isEqualTo("Laptop");
    }

    @Test
    void testGetProductByIdNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(99L));
    }

    @Test
    void testGetAllProducts() {
        Product product2 = new Product(2L, "Phone", "Electronics", 1500.0f);
        when(productRepository.findAll()).thenReturn(Arrays.asList(product, product2));

        List<ProductDto> products = productService.getAllProducts();

        assertThat(products).hasSize(2);
        assertThat(products.get(0).getProductName()).isEqualTo("Laptop");
        assertThat(products.get(1).getProductName()).isEqualTo("Phone");
    }

    @Test
    void testUpdateProductFound() {
        ProductDto updatedDto = new ProductDto(1L, 2600.0f, "Laptop Pro", "Electronics");
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDto result = productService.updateProduct(1L, updatedDto);

        assertThat(result.getProductName()).isEqualTo("Laptop Pro");
        assertThat(result.getUnitPrice()).isEqualTo(2600.0f);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testUpdateProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.updateProduct(99L, productDto));
    }

    @Test
    void testDeleteProductFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.deleteProduct(1L);

        verify(productRepository).delete(product);
    }

    @Test
    void testDeleteProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.deleteProduct(99L));
    }
}
