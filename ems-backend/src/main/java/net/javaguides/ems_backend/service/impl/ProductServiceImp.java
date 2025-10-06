package net.javaguides.ems_backend.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.entity.Product;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.ProductMapper;
import net.javaguides.ems_backend.repository.ProductRepository;
import net.javaguides.ems_backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImp implements ProductService {
    private ProductRepository productRepository;
    @Override
    public ProductDto createProduct(ProductDto productDto) {
        return ProductMapper.mapToProductDto(
                productRepository.save(
                        ProductMapper.mapToProduct(productDto)
                )
        );
    }

    @Override
    public ProductDto getProductById(Long id) {
        return ProductMapper.mapToProductDto(
                productRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("There's no product with given id: "+id))
        );
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository
                .findAll()
                .stream()
                .map(ProductMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(long id, ProductDto updatedProductDto) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("There's no user with given id: "+id)
                );

        product.setProductName(updatedProductDto.getProductName());
        product.setCategory(updatedProductDto.getCategory());
        product.setUnitPrice(updatedProductDto.getUnitPrice());

        return ProductMapper.mapToProductDto(productRepository.save(product));
    }

    @Override
    public void deleteProduct(long productId) {
        productRepository.delete(productRepository
                              .findById(productId)
                              .orElseThrow(
                                      () -> new ResourceNotFoundException("There's no user with given id: "+productId)
                              )
                );
    }
}
