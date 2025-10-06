package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.entity.Product;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ProductMapperTest {

    @Test
    void testMapToProductDto() {
        Product product = new Product(1L, "Laptop", "Electronics",  2500.0f);

        ProductDto dto = ProductMapper.mapToProductDto(product);

        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getProductName()).isEqualTo("Laptop");
        assertThat(dto.getCategory()).isEqualTo("Electronics");
        assertThat(dto.getUnitPrice()).isEqualTo(2500.0f);
    }

    @Test
    void testMapToProduct() {
        ProductDto dto = new ProductDto(1L,  2500.0f, "Laptop", "Electronics");

        Product product = ProductMapper.mapToProduct(dto);

        assertThat(product.getId()).isEqualTo(1L);
        assertThat(product.getProductName()).isEqualTo("Laptop");
        assertThat(product.getCategory()).isEqualTo("Electronics");
        assertThat(product.getUnitPrice()).isEqualTo(2500.0f);
    }
}
