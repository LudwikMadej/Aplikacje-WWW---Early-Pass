package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.entity.Product;

public class ProductMapper {
    public static ProductDto mapToProductDto(Product product){
        return new ProductDto(
                product.getId(),
                product.getUnitPrice(),
                product.getProductName(),
                product.getCategory()
        );
    }

    public static Product mapToProduct(ProductDto productDto){
        return new Product(
                productDto.getId(),
                productDto.getProductName(),
                productDto.getCategory(),
                productDto.getUnitPrice()
        );
    }
}
