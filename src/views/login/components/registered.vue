<template>
  <el-form :model="registeredForm" class="FPForm">
    <el-form-item
      prop="style"
      label="用户类型"
      :label-width="formLabelWidth"
      :rules="[
        { required: true, message: '用户类型不能为空', trigger: 'blur' },
      ]"
    >
      <!-- <el-input
        v-model="registeredForm.style"
        :rules="[{ required: true, message: '用户类型不能为空' }]"
        autocomplete="off"
      ></el-input> -->
      <el-select v-model="registeredForm.style" placeholder="请选择活动区域">
        <el-option label="市（州）级" value="shanghai"></el-option>
        <el-option label="县（区）级" value="beijing"></el-option>
        <el-option label="乡镇级" value="beijing"></el-option>
        <el-option label="村级" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="省名称"
      :rules="[{ required: true, message: '省名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-input
        v-model="registeredForm.shengName"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="市名称"
      :rules="[{ required: true, message: '市名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.shiName"
        clearable
        :disabled="shi"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shiName"
          :label="item.label"
          :value="item.shiName"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="县名称"
      :rules="[{ required: true, message: '县名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.xianName"
        clearable
        :disabled="xian"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shiName"
          :label="item.label"
          :value="item.shiName"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="乡镇名称"
      :rules="[
        { required: true, message: '乡镇名称不能为空', trigger: 'blur' },
      ]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.xiangName"
        clearable
        :disabled="xiang"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shiName"
          :label="item.label"
          :value="item.shiName"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="村名称"
      :rules="[{ required: true, message: '村名称不能为空', trigger: 'blur' }]"
      :label-width="formLabelWidth"
    >
      <el-select
        v-model="registeredForm.cmc"
        clearable
        :disabled="cun"
        placeholder="请选择"
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.shiName"
          :label="item.label"
          :value="item.shiName"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号" :label-width="formLabelWidth">
      <el-input v-model="registeredForm.sfz" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          shiName: '选项1',
          label: '石家庄市',
        },
        {
          shiName: '选项2',
          label: '唐山市',
        },
        {
          shiName: '选项3',
          label: '邯郸市',
        },
        {
          shiName: '选项4',
          label: '唐山市',
        },
        {
          shiName: '选项5',
          label: '邢台市',
        },
      ],
      registeredForm: {
        style: '',
        shengName: '河北省',
        shiName: '',
        xianName: '',
        xiangName: '',
        cmc: '',
        sfz: '',
      },
      shengName: true,
      shi: false,
      xian: true,
      xiang: true,
      cun: true,
      formLabelWidth: '120px',
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.FPForm {
  .el-select {
    width: 100%;
  }
}
</style>