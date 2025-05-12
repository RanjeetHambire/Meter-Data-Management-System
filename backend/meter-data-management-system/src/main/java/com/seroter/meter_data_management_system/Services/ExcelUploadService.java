package com.seroter.meter_data_management_system.Services;

import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.seroter.meter_data_management_system.Entity.Consumer;
import com.seroter.meter_data_management_system.Repository.ConsumerRepository;
@Service
public class ExcelUploadService {

    private final ConsumerRepository consumerRepository;

    public ExcelUploadService(ConsumerRepository consumerRepository) {
        this.consumerRepository = consumerRepository;
    }

    public void save(MultipartFile file) throws IOException {
        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // skip header

                Consumer consumer = new Consumer();
                consumer.setRegionName(getCellValue(row, 0));
                consumer.setZoneName(getCellValue(row, 1));
                consumer.setCircleName(getCellValue(row, 2));
                consumer.setDivisionName(getCellValue(row, 3));
                consumer.setSubdivisionName(getCellValue(row, 4));
                consumer.setConsumerNo(getCellValue(row, 5));
                consumer.setConsumerName(getCellValue(row, 6));
                consumer.setSectionName(getCellValue(row, 7));
                consumer.setDtcCode(getCellValue(row, 8));
                consumer.setMeterNumber(getCellValue(row, 9));
                consumer.setSolarRooftop("yes".equalsIgnoreCase(getCellValue(row, 10)));
                consumer.setReading(0.0);

                consumerRepository.save(consumer);
            }
        }
    }

    private String getCellValue(Row row, int colIndex) {
        Cell cell = row.getCell(colIndex, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf((long) cell.getNumericCellValue()); // treat as long if number
        }
        return cell.toString().trim();
    }
}
