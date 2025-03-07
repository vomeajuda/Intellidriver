import obd
import time
import os
import csv
from datetime import datetime

print('Conectando')
conexaoOBD = obd.OBD('com4')

now = datetime.now()
str_time = now.strftime('%d-%m-%Y_%H-%M-%S')

with open ('../data/data_'+str_time+'.csv', 'w', newline='') as csvfile:
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel', 'Status', 'Engine_Load', 'Posicao_Acelerador', 'Absolute_Load', 'Tipo_Combustivel', 'Temperatura_Oleo', 'L/h']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, dialect='excel')
    
    writer.writeheader()

    while True:
        rpm_res = conexaoOBD.query(obd.commands.RPM)
        speed_res = conexaoOBD.query(obd.commands.SPEED)
        temp_res = conexaoOBD.query(obd.commands.COOLANT_TEMP)
        fuel_res = conexaoOBD.query(obd.commands.FUEL_LEVEL)
        status_res = conexaoOBD.query(obd.commands.FUEL_STATUS)
        load_res = conexaoOBD.query(obd.commands.ENGINE_LOAD)
        throttle_res = conexaoOBD.query(obd.commands.THROTTLE_POS)
        absload_res = conexaoOBD.query(obd.commands.ABSOLUTE_LOAD)
        type_res = conexaoOBD.query(obd.commands.FUEL_TYPE)
        oil_res = conexaoOBD.query(obd.commands.OIL_TEMP)
        rate_res = conexaoOBD.query(obd.commands.FUEL_RATE)
        
        rpm_num = str(rpm_res.value.magnitude)
        speed_num = str(speed_res.value.magnitude)
        temp_num = str(temp_res.value.magnitude)
        fuel_num = str(round(fuel_res.value.magnitude, 3))
        status_num = str(status_res.value.magnitude)
        load_num = str(load_res.value.magnitude)
        throttle_num = str(throttle_res.value.magnitude)
        absload_num = str(absload_res.value.magnitude)
        type_num = str(type_res.value.magnitude)
        oil_num = str(oil_res.value.magnitude)
        rate_num = str(rate_res.value.magnitude)

        print("RPM: " + rpm_num)
        print("Velocidade: " + speed_num)
        print("Temperatura: " + temp_num)
        print("Combustivel: " + fuel_num)
        print("Status: " + status_num)
        print("Engine Load: " + load_num)
        print("Posicao Acelerador: " + throttle_num)
        print("Absolute Load: " + absload_num)
        print("Tipo Combustivel: " + type_num)
        print("Temperatura Oleo: " + oil_num)
        print("L/h: " + rate_num)
        
        now = datetime.now();
        str_time = now.strftime("%H-%M-%S")
        
        writer.writerow({
            'time': str_time,
            'rpm': rpm_num, 
            'velocidade': speed_num, 
            'temperatura': temp_num, 
            'combustivel': fuel_num,
            'Status': status_num,
            'Engine_Load': load_num,
            'Posicao_Acelerador': throttle_num,
            'Absolute_Load': absload_num,
            'Tipo_Combustivel': type_num,
            'Temperatura_Oleo': oil_num,
            'L/h ': rate_num
            })

        time.sleep(1)

        # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

        # with open(nome_arquivo, 'a+') as arquivo:
        #     arquivo.write(dados)

        clear = lambda: os.system('cls')
        clear()