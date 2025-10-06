package net.javaguides.ems_backend.service;

import net.javaguides.ems_backend.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Long id);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(long id, ProductDto updatedProductDto);

    void deleteProduct(long productId);
}
